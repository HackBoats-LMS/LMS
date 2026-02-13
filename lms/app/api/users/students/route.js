// import clientPromise from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db();
//     const users = await db.collection("users").find({}).toArray();

//     return NextResponse.json({
//       ok: true,
//       data: users
//     });

//   } catch (err) {
//     return NextResponse.json(
//       { ok: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }
