import supabase from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }

        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', session.user.email)
            .single();

        if (error) throw error;

        return NextResponse.json({ ok: true, data: user });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}
