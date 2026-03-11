import mongoose from "mongoose";
import { NextResponse } from "next/server";
import redis from '@/lib/redis';
import dbConnect from "@/lib/mongodb";
import supabase from "@/lib/db";
import Subject from "@/lib/models/Subject";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const cacheKey = `subject:${id} `;
        if (redis) {
            const cached = await redis.get(cacheKey);
            if (cached) {
                return NextResponse.json({ success: true, data: JSON.parse(cached) });
            }
        }

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: "Invalid subject ID" },
                { status: 400 }
            );
        }

        const subject = await Subject.findById(id);

        if (!subject) {
            return NextResponse.json(
                { success: false, error: "Subject not found" },
                { status: 404 }
            );
        }

        if (redis && subject) {
            await redis.set(`subject:${id} `, JSON.stringify(subject), 'EX', 300);
        }
        return NextResponse.json({ success: true, data: subject });
    } catch (error: any) {
        console.error("Error fetching subject by ID:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to fetch subject" },
            { status: 500 }
        );
    }
}
