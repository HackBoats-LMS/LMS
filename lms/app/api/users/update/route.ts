import supabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { email, fullName, phoneNumber, currentSemester } = await req.json();

    const { error } = await supabase
      .from('users')
      .update({
        fullName,
        phoneNumber,
        currentSemester
      })
      .eq('email', email);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
