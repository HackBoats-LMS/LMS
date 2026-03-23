import supabase from "@/lib/db";
import redis from "@/lib/redis";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    let mode = 'all';
    let supportEmail = 'support@hackboats.in';

    if (redis) {
      const [cachedMode, cachedEmail] = await Promise.all([
        redis.get('config:access_mode'),
        redis.get('config:support_email')
      ]);
      
      if (cachedMode) mode = cachedMode;
      if (cachedEmail) supportEmail = cachedEmail;
    }

    return NextResponse.json({ ok: true, mode, supportEmail });
  } catch (err: any) {
    console.error('API Admin Config Get Error:', err);
    return NextResponse.json({ 
      ok: false, 
      error: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message 
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 403 });
    }

    const { mode, supportEmail } = await req.json();

    if (mode && !['all', 'database_only'].includes(mode)) {
      return NextResponse.json({ ok: false, error: "Invalid mode" }, { status: 400 });
    }

    if (redis) {
      try {
        const pipeline = redis.pipeline();
        if (mode) pipeline.set('config:access_mode', mode);
        if (supportEmail) pipeline.set('config:support_email', supportEmail);
        await pipeline.exec();

        // Audit Logging
        console.log(`[AUDIT] Action: UPDATE_CONFIG, Actor: ${session.user.email}, Data: ${JSON.stringify({ mode, supportEmail })}, Time: ${new Date().toISOString()}`);

      } catch (redisError) {
        console.error('API Admin Config Set: Redis operation failed:', redisError);
        return NextResponse.json({ ok: false, error: "Failed to save settings to cache." }, { status: 500 });
      }
    } else {
        return NextResponse.json({ ok: false, error: "Redis not configured. Settings cannot be saved." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('API Admin Config Set Error:', err);
    return NextResponse.json({ 
      ok: false, 
      error: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message 
    }, { status: 500 });
  }
}
