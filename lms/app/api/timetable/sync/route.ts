import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST() {
  try {
    const jsonPath = path.join(process.cwd(), "public", "timetable.json");
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    
    const client = await clientPromise;
    const db = client.db();
    
    await db.collection("timetable").updateOne(
      { id: "main" },
      { $set: { schedule: jsonData } },
      { upsert: true }
    );
    
    return NextResponse.json({ ok: true, message: "Timetable synced from JSON" });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
