import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function POST(req: Request) {
  try {
    const { students } = await req.json();

    if (!Array.isArray(students) || students.length === 0) {
      return NextResponse.json({ ok: false, error: "Invalid data format" }, { status: 400 });
    }

    console.log(`API Bulk Add: Received ${students.length} students`);

    // 1. Get all existing emails to avoid duplicates
    const { data: existingUsers, error: fetchError } = await supabase
      .from('users')
      .select('email');

    if (fetchError) throw fetchError;

    const existingEmails = new Set(existingUsers?.map(u => u.email.toLowerCase()) || []);
    
    // 2. Filter out students that already exist
    const newStudents = students
      .filter(s => s.email && !existingEmails.has(s.email.toLowerCase()))
      .map(s => ({
        email: s.email.toLowerCase(),
        fullName: s.fullName || "",
        phoneNumber: s.phoneNumber || "",
        college: s.college || "",
        currentSemester: s.currentSemester || 1,
        isAdmin: false,
        createdAt: new Date().toISOString()
      }));

    if (newStudents.length === 0) {
      return NextResponse.json({ ok: true, message: "No new students to add", addedCount: 0 });
    }

    // 3. Bulk insert into Supabase
    const { error: insertError } = await supabase
      .from('users')
      .insert(newStudents);

    if (insertError) {
      console.error(`API Bulk Add: Supabase insert error:`, insertError);
      throw insertError;
    }

    // 4. Invalidate Cache
    if (redis) {
      await redis.del('students:all');
      console.log('API Bulk Add: Invalidated students:all cache');
    }

    console.log(`API Bulk Add: Successfully added ${newStudents.length} students`);
    return NextResponse.json({ 
      ok: true, 
      message: `Successfully added ${newStudents.length} students`,
      addedCount: newStudents.length,
      skippedCount: students.length - newStudents.length
    });
  } catch (err: any) {
    console.error(`API Bulk Add: Fatal error:`, err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
