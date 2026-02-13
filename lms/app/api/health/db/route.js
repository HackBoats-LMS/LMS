import supabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { error } = await supabase.from('users').select('count', { count: 'exact', head: true });

    if (error) throw error;

    return NextResponse.json({
      ok: true,
      status: "connected",
      provider: "supabase"
    });

  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
