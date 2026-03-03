
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Subject from "@/lib/models/Subject";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        // Basic validation
        if (!body.name) {
            return NextResponse.json(
                { success: false, error: "Subject name is required" },
                { status: 400 }
            );
        }

        // Check if subject already exists
        const existingSubject = await Subject.findOne({ name: body.name });
        if (existingSubject) {
            return NextResponse.json(
                { success: false, error: "Subject with this name already exists" },
                { status: 400 }
            );
        }

        console.log("Creating new subject with payload:", JSON.stringify(body, null, 2));
        const subject = await Subject.create(body);
        console.log("Successfully created subject:", subject._id);
        return NextResponse.json({ success: true, data: subject }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating subject:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to create subject" },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { _id, ...updateData } = body;

        if (!_id) {
            return NextResponse.json(
                { success: false, error: "Subject ID is required" },
                { status: 400 }
            );
        }

        console.log(`Updating subject ${_id} with data:`, JSON.stringify(updateData, null, 2));
        const subject = await Subject.findByIdAndUpdate(
            _id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        console.log("Subject updated successfully:", subject ? "found and updated" : "not found");

        if (!subject) {
            return NextResponse.json(
                { success: false, error: "Subject not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: subject });
    } catch (error: any) {
        console.error("Error updating subject:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to update subject" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
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

        return NextResponse.json({ success: true, message: "Subject deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting subject:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to delete subject" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();
        const subjects = await Subject.find({});
        console.log("Subjects in DB:", subjects.map(s => ({ name: s.name, description: s.description ? s.description.substring(0, 20) : "N/A" })));
        return NextResponse.json({ success: true, data: subjects });
    } catch (error: any) {
        console.error("Error fetching subjects:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to fetch subjects" },
            { status: 500 }
        );
    }
}
