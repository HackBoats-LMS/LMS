import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Certificate from '@/lib/models/Certificate';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const { userId, userName, courseId, courseName } = await req.json();

        if (!userId || !userName || !courseId || !courseName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        await dbConnect();

        // Check if certificate already exists for this user and course
        const existing = await Certificate.findOne({ userId, courseId });
        if (existing) {
            return NextResponse.json({ certificateId: existing.certificateId });
        }

        // Generate a unique ID: HB-[COURSE_SHORT]-[RANDOM]
        const courseShort = courseName.replace(/\s+/g, '').substring(0, 3).toUpperCase();
        const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
        const certificateId = `HB-${courseShort}-${randomHex}`;

        // Generate a verification token for added security
        const verificationToken = crypto.createHash('sha256').update(certificateId + userId).digest('hex');

        const newCertificate = await Certificate.create({
            certificateId,
            userId,
            userName,
            courseId,
            courseName,
            verificationToken,
        });

        return NextResponse.json({ certificateId: newCertificate.certificateId });
    } catch (error) {
        console.error('Certification Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
