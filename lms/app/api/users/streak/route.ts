import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/db";
import { updateUserStreak } from "@/app/api/progress/route";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Auto-update streak on dashboard load (counts as activity)
        const updatedStreak = await updateUserStreak(email);

        return NextResponse.json({ success: true, streak: updatedStreak || 0 });
    } catch (error: any) {
        console.error("GET /api/users/streak error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
