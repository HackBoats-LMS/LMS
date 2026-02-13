import supabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, fullName, isAdmin');

    if (error) throw error;

    const count = users?.length || 0;

    return NextResponse.json({ ok: true, count, data: users });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
