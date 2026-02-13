import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const { data: timetable, error } = await supabase
      .from('timetable')
      .select('schedule')
      .eq('id', 'main')
      .single();

    if (timetable?.schedule && !error) {
      return NextResponse.json({ ok: true, data: timetable.schedule });
    }

    // If no DB data, initialize from JSON
    const jsonPath = path.join(process.cwd(), "public", "timetable.json");
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    await supabase
      .from('timetable')
      .upsert({ id: 'main', schedule: jsonData });

    return NextResponse.json({ ok: true, data: jsonData });
  } catch (err: any) {
    // Fallback to JSON on error
    try {
      const jsonPath = path.join(process.cwd(), "public", "timetable.json");
      const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
      return NextResponse.json({ ok: true, data: jsonData });
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

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
