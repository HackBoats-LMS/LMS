import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { GET as handler } from "@/app/api/auth/[...nextauth]/route"; // Assuming NextAuth options are exported from here, or we can just pass req if using App Router. 
// Actually we can just receive the email via URL param or POST body to keep it simple, 
// but since this is a GET request let's use searchParams.

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const email = url.searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Fetch the single most recent progress entry for the user
        const { data, error } = await supabase
            .from('progress')
            .select('subject, unitId, moduleId, moduleName, percentage, score, totalQuestions')
            .eq('userEmail', email)
            .order('updatedAt', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            // PGRST116 means no rows returned, which is fine (user has no progress)
            if (error.code === 'PGRST116') {
                return NextResponse.json({ success: true, data: null });
            }
            throw error;
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('GET /api/progress/continue error:', error);
        return NextResponse.json({ error: "Failed to fetch continue learning data" }, { status: 500 });
    }
}
