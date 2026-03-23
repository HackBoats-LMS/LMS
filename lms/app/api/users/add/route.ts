import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { hash } from "bcryptjs";

// Optional: Set allowed email domains (empty array = allow all)
const ALLOWED_DOMAINS: string[] = []; // Example: ['ggu.edu.in', 'gmail.com']

import { z } from "zod";

const addUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  isAdmin: z.boolean().optional().default(false),
  password: z.string().min(8, "Password must be at least 8 characters long").optional(),
  college: z.string().optional().default(""),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const validation = addUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({
        ok: false,
        error: validation.error.issues[0].message
      }, { status: 400 });
    }

    const { email, isAdmin, password, college } = validation.data;
    console.log(`API User Add: Attempting to add ${email} (isAdmin: ${isAdmin})`);

    // Optional: Email domain validation (disabled for now)
    if (ALLOWED_DOMAINS.length > 0) {
      const emailDomain = email.split('@')[1];
      if (!ALLOWED_DOMAINS.includes(emailDomain)) {
        return NextResponse.json({
          ok: false,
          error: `Only emails from ${ALLOWED_DOMAINS.join(', ')} are allowed`
        }, { status: 400 });
      }
    }

    // Check if user with this email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      console.log(`API User Add: User ${email} already exists`);
      return NextResponse.json({ ok: false, error: "User already exists" }, { status: 400 });
    }

    // Prepare user data
    const userData: any = {
      email,
      fullName: "",
      phoneNumber: "",
      college: college || "",
      currentSemester: isAdmin ? 0 : 1,
      isAdmin: isAdmin || false,
      createdAt: new Date().toISOString()
    };

    // Add password only for admin users
    if (isAdmin && password) {
      userData.password = await hash(password, 10);
    }

    // Create new user
    const { error } = await supabase
      .from('users')
      .insert(userData);

    if (error) {
      console.error(`API User Add: Supabase error:`, error);
      throw error;
    }

    // Invalidate Cache
    if (redis) {
      try {
        await redis.del('students:all');
        console.log('API User Add: Invalidated students:all cache');
      } catch (redisError) {
        console.error('API User Add: Redis cache invalidation failed:', redisError);
      }
    }

    // Audit Logging
    console.log(`[AUDIT] Action: ADD_USER, Actor: ${session.user.email}, Target: ${email}, Time: ${new Date().toISOString()}`);

    console.log(`API User Add: Successfully added ${email}`);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(`API User Add: Fatal error:`, err);
    return NextResponse.json({ 
      ok: false, 
      error: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message 
    }, { status: 500 });
  }
}
