import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function DELETE(req: Request) {
  try {
    const { email } = await req.json();

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('email', email);

    if (error) throw error;

    // Invalidate Cache
    if (redis) {
      await redis.del('students:all');
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
