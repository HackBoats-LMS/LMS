import supabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { data: users, error } = await supabase
            .from('users')
            .select('id, email, fullName, phoneNumber, currentSemester, isAdmin, createdAt')
            .order('createdAt', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ ok: true, data: users || [] });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}
