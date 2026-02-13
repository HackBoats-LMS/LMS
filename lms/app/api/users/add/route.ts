import supabase from "@/lib/db";
import { NextResponse } from "next/server";

// Optional: Set allowed email domains (empty array = allow all)
const ALLOWED_DOMAINS: string[] = []; // Example: ['ggu.edu.in', 'gmail.com']

export async function POST(req: Request) {
  try {
    const { email, isAdmin, password } = await req.json();

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
      return NextResponse.json({ ok: false, error: "User already exists" }, { status: 400 });
    }

    // Prepare user data
    const userData: any = {
      email,
      fullName: "",
      phoneNumber: "",
      currentSemester: isAdmin ? 0 : 1,
      isAdmin: isAdmin || false
    };

    // Add password only for admin users
    if (isAdmin && password) {
      userData.password = password;
    }

    // Create new user
    const { error } = await supabase
      .from('users')
      .insert(userData);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
