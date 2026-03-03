import mongoose from "mongoose";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Subject from "@/lib/models/Subject";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;

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

        return NextResponse.json({ success: true, data: subject });
    } catch (error: any) {
        console.error("Error fetching subject by ID:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to fetch subject" },
            { status: 500 }
        );
    }
}
