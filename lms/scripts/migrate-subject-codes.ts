// Database Migration Script
// Run this to fix lowercase subject codes in the progress collection

import supabase from "@/lib/db";

async function migrateSubjectCodes() {
  try {
    console.log("Starting subject code migration...");

    const migrations = [
      { from: "nss", to: "NSS" },
      { from: "ds", to: "DS" },
      { from: "es", to: "ES" },
      { from: "os", to: "OS" },
      { from: "ls", to: "LS" },
      { from: "flat", to: "FLAT" },
      { from: "fswd", to: "FSWD" }
    ];

    for (const { from, to } of migrations) {
      const { data, error } = await supabase
        .from("progress")
        .update({ subject: to })
        .eq("subject", from)
        .select();

      if (error) {
        console.error(`Error migrating ${from} to ${to}:`, error.message);
      } else {
        console.log(`Updated ${data?.length || 0} records from "${from}" to "${to}"`);
      }
    }

    // Verify distinct subject codes
    const { data: allSubjects } = await supabase.from("progress").select("subject");
    const subjects = Array.from(new Set(allSubjects?.map(s => s.subject)));

    console.log("\nCurrent subject codes in database:", subjects);

    console.log("\nMigration completed successfully!");
  } catch (error: any) {
    console.error("Migration failed:", error.message);
  }
}

// Run migration
migrateSubjectCodes();
