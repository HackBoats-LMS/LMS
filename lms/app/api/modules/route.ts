import supabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { subject, moduleName, description, fileUrl } = await req.json();

    const { error } = await supabase
      .from('modules')
      .insert({
        subject,
        moduleName,
        description,
        fileUrl
      });

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject");

    let query = supabase.from('modules').select('*');

    if (subject) {
      query = query.eq('subject', subject);
    }

    const { data: modules, error } = await query;

    if (error) throw error;

    return NextResponse.json({ ok: true, data: modules || [] });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
