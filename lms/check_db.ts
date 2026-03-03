import 'dotenv/config';
import mongoose from 'mongoose';
import dbConnect from './lib/mongodb';
import Subject from './lib/models/Subject';

async function checkDB() {
    try {
        await dbConnect();
        const subjects = await Subject.find({});
        console.log("Subject Data in DB:");
        subjects.forEach(s => {
            console.log(`- Name: ${s.name}`);
            console.log(`  Description: ${s.description?.trim() || '(NO DESCRIPTION)'}`);
            console.log(`  _id: ${s._id}`);
            console.log("-------------------");
        });
    } catch (error) {
        console.error("DB check failed:", error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
    }
}

checkDB();
