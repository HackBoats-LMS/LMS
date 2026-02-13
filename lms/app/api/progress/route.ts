import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/db";
import { getModuleName } from "@/lib/moduleNames";
import redis from "@/lib/redis"; // Import Redis client

// Cache key helper
const getCacheKey = (email: string, subject: string | null) =>
  `progress:${email}:${subject || 'all'}`;

export async function POST(req: NextRequest) {
  try {
    const { userEmail, subject, unitId, moduleId, score, totalQuestions, completed } = await req.json();

    // Ensure unitId and moduleId are integers
    const unitIdInt = parseInt(String(unitId), 10);
    const moduleIdInt = parseInt(String(moduleId), 10);

    console.log('POST /api/progress received:', { userEmail, subject, unitId: unitIdInt, moduleId: moduleIdInt, score, totalQuestions });

    const moduleName = getModuleName(subject, unitIdInt, moduleIdInt);
    const percentage = Math.round((score / totalQuestions) * 100);
    const isCompleted = completed || percentage >= 60;
    const now = new Date().toISOString();

    const progressData: any = {
      userEmail,
      subject,
      unitId: unitIdInt,
      moduleId: moduleIdInt,
      score,
      totalQuestions,
      moduleName,
      percentage,
      completed: isCompleted,
      updatedAt: now
    };

    // If completed, set completedAt. 
    // Note: This will overwrite existing completedAt. If preserving original completion date is critical,
    // we would need to check existence first, but that reintroduces the race condition or requires a more complex query.
    // For now, updating completion date to latest success is acceptable for "replacing" the attempt.
    if (isCompleted) {
      progressData.completedAt = now;
    }

    // Perform Upsert operation
    // Requires UNIQUE constraint on (userEmail, subject, unitId, moduleId)
    const { data, error } = await supabase
      .from('progress')
      .upsert(progressData, {
        onConflict: 'userEmail, subject, unitId, moduleId',
        ignoreDuplicates: false
      })
      .select();

    if (error) {
      console.error('Supabase upsert error:', error);
      // If error is related to constraint violation despite upsert, logic might be wrong.
      // But typically upsert handles it.
      throw error;
    }

    // Invalidate Cache for this user
    if (redis) {
      const cacheKey = getCacheKey(userEmail, subject);
      await redis.del(cacheKey);
      // Also invalidate 'all' if subject specific cache exists
      await redis.del(getCacheKey(userEmail, null));
    }

    console.log('Progress saved successfully (Upsert):', { userEmail, subject, unitId: unitIdInt, percentage });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('POST /api/progress error:', error);
    return NextResponse.json({ error: error.message || "Failed to save progress" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");
    const subject = searchParams.get("subject");

    if (!userEmail && searchParams.get("all") !== "true") {
      return NextResponse.json({ error: "User email required" }, { status: 400 });
    }

    // Try Redis Cache first
    if (redis && userEmail) {
      const cacheKey = getCacheKey(userEmail, subject);
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        return NextResponse.json({ success: true, data: JSON.parse(cachedData), source: 'cache' });
      }
    }

    let query = supabase.from('progress').select('*');

    if (userEmail) query = query.eq('userEmail', userEmail);
    if (subject) query = query.eq('subject', subject);

    const { data: progress, error } = await query;

    if (error) throw error;

    // Set Redis Cache (TTL 1 hour)
    if (redis && progress && userEmail) {
      const cacheKey = getCacheKey(userEmail, subject);
      await redis.set(cacheKey, JSON.stringify(progress), 'EX', 3600);
    }

    return NextResponse.json({ success: true, data: progress || [], source: 'db' }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('GET /api/progress error:', error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}
