import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
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
      const { data, error } = await supabase
        .from("progress")
        .update({ subject: to })
        .eq("subject", from)
        .select();

      if (error) {
        console.error(`Error migrating ${from} to ${to}:`, error);
        results.push({ from, to, error: error.message });
      } else {
        results.push({ from, to, updated: data?.length || 0 });
      }
    }

    // Get distinct subjects using client-side unique filtering
    // (Supabase doesn't have a direct distinct() method in the JS client without RPC)
    const { data: allSubjects, error: fetchError } = await supabase
      .from("progress")
      .select("subject");

    if (fetchError) throw fetchError;

    const subjectList = allSubjects ? allSubjects.map(s => s.subject) : [];
    const subjects = Array.from(new Set(subjectList));

    return NextResponse.json({
      success: true,
      results,
      currentSubjects: subjects
    });
  } catch (error: any) {
    console.error("Migration error:", error);
    return NextResponse.json({ error: error.message || "Migration failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Get distinct subjects
    const { data: allSubjects, error } = await supabase
      .from("progress")
      .select("subject");

    if (error) throw error;

    const subjectList = allSubjects ? allSubjects.map(s => s.subject) : [];
    const uniqueSubjects = Array.from(new Set(subjectList));

    const counts = await Promise.all(
      uniqueSubjects.map(async (subject) => {
        const { count } = await supabase
          .from("progress")
          .select("*", { count: "exact", head: true })
          .eq("subject", subject);

        return {
          subject,
          count: count || 0
        };
      })
    );

    return NextResponse.json({
      success: true,
      subjects: counts
    });
  } catch (error: any) {
    console.error("Check subjects error:", error);
    return NextResponse.json({ error: error.message || "Failed to check subjects" }, { status: 500 });
  }
}
