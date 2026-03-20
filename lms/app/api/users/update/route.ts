import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function PUT(req: Request) {
  try {
    const { email, fullName, phoneNumber, rollNo, whatsapp, college, department, year, currentSemester, section } = await req.json();

    const { error } = await supabase
      .from('users')
      .update({
        fullName,
        phoneNumber,
        rollNo,
        whatsapp,
        college,
        department,
        year,
        currentSemester,
        section
      })
      .eq('email', email);

    if (error) throw error;

    if (redis) {
      await redis.del('students:all');
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
