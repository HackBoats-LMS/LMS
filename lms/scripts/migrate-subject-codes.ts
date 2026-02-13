// Database Migration Script
// Run this to fix lowercase subject codes in the progress collection

import clientPromise from "@/lib/db";

async function migrateSubjectCodes() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
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
      const result = await db.collection("progress").updateMany(
        { subject: from },
        { $set: { subject: to } }
      );
      console.log(`Updated ${result.modifiedCount} records from "${from}" to "${to}"`);
    }
    
    // Verify distinct subject codes
    const subjects = await db.collection("progress").distinct("subject");
    console.log("\nCurrent subject codes in database:", subjects);
    
    console.log("\nMigration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

// Run migration
migrateSubjectCodes();
