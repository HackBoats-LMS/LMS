import supabase from "@/lib/db";
import { NextResponse } from "next/server";

const students = [
  "241uft0001@ggu.edu.in", "241uft0002@ggu.edu.in", "241uft0003@ggu.edu.in",
  "241uft0004@ggu.edu.in", "241uft0005@ggu.edu.in", "241uft0006@ggu.edu.in",
  "241uft0007@ggu.edu.in", "241uft0008@ggu.edu.in", "241uft0009@ggu.edu.in",
  "241uft0010@ggu.edu.in", "241uft0011@ggu.edu.in", "241uft0012@ggu.edu.in",
  "241uft0013@ggu.edu.in", "241uft0014@ggu.edu.in", "241uft0015@ggu.edu.in",
  "241uft0016@ggu.edu.in", "241uft0017@ggu.edu.in", "241uft0018@ggu.edu.in",
  "241uft0019@ggu.edu.in", "241uft0020@ggu.edu.in", "241uft0021@ggu.edu.in",
  "241uft0022@ggu.edu.in"
];

export async function POST() {
  try {
    const users = students.map(email => ({
      email,
      fullName: "",
      phoneNumber: "",
      currentSemester: 4,
      isAdmin: false
    }));

    const { error } = await supabase
      .from('users')
      .insert(users);

    if (error) throw error;

    return NextResponse.json({ ok: true, message: "Students seeded successfully" });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
