import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/db";
import { getModuleName } from "@/lib/moduleNames";

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

    // Check if progress exists
    const { data: existing, error: fetchError } = await supabase
      .from('progress')
      .select('*')
      .eq('userEmail', userEmail)
      .eq('subject', subject)
      .eq('unitId', unitIdInt)
      .eq('moduleId', moduleIdInt)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is expected for new records
      console.error('Error fetching existing progress:', fetchError);
    }

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

    // Only set completedAt if newly completed or doesn't exist
    if (isCompleted && (!existing || !existing.completed)) {
      progressData.completedAt = now;
    } else if (existing?.completedAt) {
      progressData.completedAt = existing.completedAt;
    }

    let result;
    if (existing) {
      console.log('Updating existing progress for:', { userEmail, subject, unitId: unitIdInt, moduleId: moduleIdInt });
      result = await supabase
        .from('progress')
        .update(progressData)
        .eq('userEmail', userEmail)
        .eq('subject', subject)
        .eq('unitId', unitIdInt)
        .eq('moduleId', moduleIdInt);
    } else {
      console.log('Inserting new progress for:', { userEmail, subject, unitId: unitIdInt, moduleId: moduleIdInt });
      if (isCompleted && !progressData.completedAt) {
        progressData.completedAt = now;
      }
      result = await supabase
        .from('progress')
        .insert(progressData);
    }

    if (result.error) {
      console.error('Supabase error:', result.error);
      throw result.error;
    }

    console.log('Progress saved successfully:', { userEmail, subject, unitId: unitIdInt, moduleId: moduleIdInt, percentage, completed: isCompleted });

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

    let query = supabase.from('progress').select('*');

    if (userEmail) query = query.eq('userEmail', userEmail);
    if (subject) query = query.eq('subject', subject);

    const { data: progress, error } = await query;

    if (error) throw error;

    return NextResponse.json({ success: true, data: progress || [] }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}
