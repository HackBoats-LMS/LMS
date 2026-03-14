import supabase from "@/lib/db";
import redis from "@/lib/redis";
import { NextResponse } from "next/server";

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
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { mode, supportEmail } = await req.json();

    if (mode && !['all', 'database_only'].includes(mode)) {
      return NextResponse.json({ ok: false, error: "Invalid mode" }, { status: 400 });
    }

    if (redis) {
      const pipeline = redis.pipeline();
      if (mode) pipeline.set('config:access_mode', mode);
      if (supportEmail) pipeline.set('config:support_email', supportEmail);
      await pipeline.exec();
    } else {
        return NextResponse.json({ ok: false, error: "Redis not configured. Settings cannot be saved." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
