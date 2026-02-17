
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Subject from "@/lib/models/Subject";

export async function POST() {
    try {
        await dbConnect();

        const subjects = await Subject.find({});
        let updatedCount = 0;

        for (const subject of subjects) {
            if (subject.modules && subject.modules.length > 0) {
                let modified = false;

                // Sort modules if possible to apply sequential numbering correctly
                // Optional: if reliable original index exists, use that. 
                // Here we assume the array order is the intended order.

                subject.modules.forEach((module: any, index: number) => {
                    const newPlace = (index + 1).toString();
                    if (module.place !== newPlace) {
                        module.place = newPlace;
                        modified = true;
                    }
                });

                if (modified) {
                    await subject.save();
                    updatedCount++;
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: `Successfully migrated ${updatedCount} subjects to integer module ordering.`
        });

    } catch (error: any) {
        console.error("Migration error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to migrate subjects" },
            { status: 500 }
        );
    }
}
