import supabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Fetch directly from DB for real-time accuracy in admin dashboard
        const { data: users, error } = await supabase
            .from('users')
            .select('id, email, fullName, phoneNumber, college, currentSemester, isAdmin, createdAt')
            .order('createdAt', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ ok: true, data: users || [], source: 'db' });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}
