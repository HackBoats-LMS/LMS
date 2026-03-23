import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Subject from "@/lib/models/Subject";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

import { z } from "zod";

const subjectSchema = z.object({
    name: z.string().min(1, "Subject name is required"),
    description: z.string().optional(),
    template: z.string().optional(),
    bannerColor: z.string().optional(),
    hashtags: z.array(z.string()).optional(),
    modules: z.array(z.any()).optional(),
    // Keep legacy fields for compatibility
    code: z.string().optional(),
    image_url: z.string().optional(),
    tags: z.array(z.string()).optional(),
    credits: z.number().optional(),
});

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.isAdmin) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const validation = subjectSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({
                success: false,
                error: validation.error.issues[0].message
            }, { status: 400 });
        }

        await dbConnect();
        const { name } = validation.data;

        // Check if subject already exists
        const existingSubject = await Subject.findOne({ name });
        if (existingSubject) {
            return NextResponse.json(
                { success: false, error: "Subject with this name already exists" },
                { status: 400 }
            );
        }

        const subject = await Subject.create(validation.data);

        // Audit Logging
        console.log(`[AUDIT] Action: CREATE_SUBJECT, Actor: ${session.user.email}, Target: ${name}, Time: ${new Date().toISOString()}`);

        return NextResponse.json({ success: true, data: subject });
    } catch (error: any) {
        console.error("Error creating subject:", error);
        return NextResponse.json(
            {
                success: false,
                error: process.env.NODE_ENV === "production" ? "Internal Server Error" : (error.message || "Failed to create subject")
            },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.isAdmin) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { _id, ...updateData } = body;

        if (!_id) {
            return NextResponse.json(
                { success: false, error: "Subject ID is required" },
                { status: 400 }
            );
        }

        const validation = subjectSchema.partial().safeParse(updateData);
        if (!validation.success) {
            return NextResponse.json({
                success: false,
                error: validation.error.issues[0].message
            }, { status: 400 });
        }

        await dbConnect();

        // Final sanity check for development
        if (process.env.NODE_ENV !== "production") {
            console.log(`[PUT SUBJECT] ID: ${_id}, Update:`, validation.data);
        }

        const subject = await Subject.findByIdAndUpdate(
            _id,
            { $set: validation.data },
            { new: true, runValidators: true }
        );

        if (process.env.NODE_ENV !== "production") {
            console.log(`[PUT SUBJECT] Result:`, subject?.name, "Color:", subject?.bannerColor);
        }

        // Audit Logging
        console.log(`[AUDIT] Action: UPDATE_SUBJECT, Actor: ${session.user.email}, Target: ${_id}, Time: ${new Date().toISOString()}`);

        return NextResponse.json({ success: true, data: subject });
    } catch (error: any) {
        console.error("Error updating subject:", error);
        return NextResponse.json(
            {
                success: false,
                error: process.env.NODE_ENV === "production" ? "Internal Server Error" : (error.message || "Failed to update subject")
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.isAdmin) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
        }

        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: "Subject ID is required" },
                { status: 400 }
            );
        }

        const deletedSubject = await Subject.findByIdAndDelete(id);

        if (!deletedSubject) {
            return NextResponse.json(
                { success: false, error: "Subject not found" },
                { status: 404 }
            );
        }

        // Audit Logging
        console.log(`[AUDIT] Action: DELETE_SUBJECT, Actor: ${session.user.email}, Target: ${id}, Time: ${new Date().toISOString()}`);

        return NextResponse.json({ success: true, message: "Subject deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting subject:", error);
        return NextResponse.json(
            {
                success: false,
                error: process.env.NODE_ENV === "production" ? "Internal Server Error" : (error.message || "Failed to delete subject")
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();
        const subjects = await Subject.find({});
        return NextResponse.json({ success: true, data: subjects });
    } catch (error: any) {
        console.error("Error fetching subjects:", error);
        return NextResponse.json(
            {
                success: false,
                error: process.env.NODE_ENV === "production" ? "Internal Server Error" : (error.message || "Failed to fetch subjects")
            },
            { status: 500 }
        );
    }
}
