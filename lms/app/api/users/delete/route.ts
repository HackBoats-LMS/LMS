import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

import { z } from "zod";

const deleteUserSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const validation = deleteUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({
        ok: false,
        error: validation.error.issues[0].message
      }, { status: 400 });
    }

    const { email } = validation.data;

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('email', email);

    if (error) throw error;

    // Invalidate Cache
    if (redis) {
      try {
        await redis.del('students:all');
      } catch (redisError) {
        console.error('API User Delete: Redis cache invalidation failed:', redisError);
      }
    }

    // Audit Logging
    console.log(`[AUDIT] Action: DELETE_USER, Actor: ${session.user.email}, Target: ${email}, Time: ${new Date().toISOString()}`);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('API User Delete: Fatal error:', err);
    return NextResponse.json({ 
      ok: false, 
      error: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message 
    }, { status: 500 });
  }
}
