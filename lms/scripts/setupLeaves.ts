import clientPromise from "@/lib/db";

async function setupLeaveCollection() {
  try {
    const client = await clientPromise;
    const db = client.db("lms");
    
    // Create TTL index to auto-delete documents after 30 days
    await db.collection("leaves").createIndex(
      { expiresAt: 1 },
      { expireAfterSeconds: 0 }
    );
    
    console.log("✅ Leave collection setup complete with TTL index");
  } catch (error) {
    console.error("❌ Error setting up leave collection:", error);
  }
}

setupLeaveCollection();
