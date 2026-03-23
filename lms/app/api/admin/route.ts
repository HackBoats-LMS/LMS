import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST() {
  try {
    const { data: existingAdmin } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@ggu.edu.in')
      .single();

    if (existingAdmin) {
      return NextResponse.json({ ok: false, message: "Admin already exists" });
    }

    const hashedPassword = await hash("admin123", 10);
    const { error } = await supabase
      .from('users')
      .insert({
        email: "admin@ggu.edu.in",
        password: hashedPassword,
        fullName: "Admin",
        phoneNumber: "",
        currentSemester: 0,
        isAdmin: true
      });

    if (error) throw error;

    return NextResponse.json({ ok: true, message: "Admin created successfully" });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
