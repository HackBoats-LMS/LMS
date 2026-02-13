import clientPromise from "@/lib/db";

const students = [
  "241uft0001@ggu.edu.in", "241uft0002@ggu.edu.in", "241uft0003@ggu.edu.in",
  "241uft0004@ggu.edu.in", "241uft0005@ggu.edu.in", "241uft0006@ggu.edu.in",
  "241uft0007@ggu.edu.in", "241uft0008@ggu.edu.in", "241uft0009@ggu.edu.in",
  "241uft0010@ggu.edu.in", "241uft0011@ggu.edu.in", "241uft0012@ggu.edu.in",
  "241uft0013@ggu.edu.in", "241uft0014@ggu.edu.in", "241uft0015@ggu.edu.in",
  "241uft0016@ggu.edu.in", "241uft0017@ggu.edu.in", "241uft0018@ggu.edu.in",
  "241uft0019@ggu.edu.in", "241uft0020@ggu.edu.in", "241uft0021@ggu.edu.in",
  "241uft0022@ggu.edu.in"
];

async function seedStudents() {
  const client = await clientPromise;
  const db = client.db();
  
  const users = students.map(email => ({
    email,
    fullName: "",
    phoneNumber: "",
    currentSemester: 1,
    isAdmin: false
  }));
  
  await db.collection("users").insertMany(users);
  console.log("Students seeded successfully");
}

seedStudents();
