import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

import { z } from "zod";

const updateUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  fullName: z.string().optional(),
  phoneNumber: z.string().optional(),
  rollNo: z.string().optional(),
  whatsapp: z.string().optional(),
  college: z.string().optional(),
  department: z.string().optional(),
  year: z.union([z.number(), z.string()]).optional().transform(v => Number(v)),
  currentSemester: z.union([z.number(), z.string()]).optional().transform(v => Number(v)),
  section: z.string().optional(),
});

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = updateUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({
        ok: false,
        error: validation.error.issues[0].message
      }, { status: 400 });
    }

    const { email, fullName, phoneNumber, rollNo, whatsapp, college, department, year, currentSemester, section } = validation.data;

    // Only allow updating own profile OR admin update
    if (session.user.email !== email && !session.user.isAdmin) {
      return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }

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

    // Invalidate Cache
    if (redis) {
      try {
        await redis.del('students:all');
        console.log('API User Update: Invalidated students:all cache');
      } catch (redisError) {
        console.error('API User Update: Redis cache invalidation failed:', redisError);
      }
    }

    // Audit Logging
    console.log(`[AUDIT] Action: UPDATE_USER, Actor: ${session.user.email}, Target: ${email}, Time: ${new Date().toISOString()}`);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('API User Update: Fatal error:', err);
    return NextResponse.json({ 
      ok: false, 
      error: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message 
    }, { status: 500 });
  }
}
