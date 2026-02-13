import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const migrations = [
      { from: "nss", to: "NSS" },
      { from: "ds", to: "DS" },
      { from: "es", to: "ES" },
      { from: "os", to: "OS" },
      { from: "ls", to: "LS" },
      { from: "flat", to: "FLAT" },
      { from: "fswd", to: "FSWD" }
    ];
    
    const results = [];
    
    for (const { from, to } of migrations) {
      const result = await db.collection("progress").updateMany(
        { subject: from },
        { $set: { subject: to } }
      );
      results.push({ from, to, updated: result.modifiedCount });
    }
    
    const subjects = await db.collection("progress").distinct("subject");
    
    return NextResponse.json({ 
      success: true, 
      results,
      currentSubjects: subjects
    });
  } catch (error) {
    return NextResponse.json({ error: "Migration failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const subjects = await db.collection("progress").distinct("subject");
    const counts = await Promise.all(
      subjects.map(async (subject) => ({
        subject,
        count: await db.collection("progress").countDocuments({ subject })
      }))
    );
    
    return NextResponse.json({ 
      success: true, 
      subjects: counts
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to check subjects" }, { status: 500 });
  }
}
