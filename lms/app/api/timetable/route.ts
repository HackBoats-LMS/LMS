import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import redis from "@/lib/redis";

const CACHE_KEY = 'timetable:main';
const CACHE_TTL = 24 * 60 * 60; // 24 hours

export async function GET() {
  try {
    // 1. Try Redis Cache
    if (redis) {
      const cached = await redis.get(CACHE_KEY);
      if (cached) {
        return NextResponse.json({ ok: true, data: JSON.parse(cached), source: 'cache' });
      }
    }

    // 2. Fetch from DB
    const { data: timetable, error } = await supabase
      .from('timetable')
      .select('schedule')
      .eq('id', 'main')
      .single();

    let scheduleData;

    if (timetable?.schedule && !error) {
      scheduleData = timetable.schedule;
    } else {
      // 3. Fallback to JSON
      const jsonPath = path.join(process.cwd(), "public", "timetable.json");
      scheduleData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

      // Sync to DB if missing
      await supabase
        .from('timetable')
        .upsert({ id: 'main', schedule: scheduleData });
    }

    // 4. Set Redis Cache
    if (redis && scheduleData) {
      await redis.set(CACHE_KEY, JSON.stringify(scheduleData), 'EX', CACHE_TTL);
    }

    return NextResponse.json({ ok: true, data: scheduleData, source: 'db' });
  } catch (err: any) {
    // Fallback to JSON on error
    try {
      const jsonPath = path.join(process.cwd(), "public", "timetable.json");
      const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
      return NextResponse.json({ ok: true, data: jsonData, source: 'fs' });
    } catch (fallbackErr: any) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
  }
}

export async function PUT(req: Request) {
  try {
    const { schedule } = await req.json();

    const { error } = await supabase
      .from('timetable')
      .upsert({
        id: 'main',
        schedule,
        updatedAt: new Date().toISOString()
      });

    if (error) throw error;

    // Invalidate Cache
    if (redis) {
      await redis.del(CACHE_KEY);
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
