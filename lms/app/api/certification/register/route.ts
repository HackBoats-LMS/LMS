import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Certificate from '@/lib/models/Certificate';
import crypto from 'crypto';

import { z } from 'zod';

const registerCertSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    userName: z.string().min(1, "User name is required"),
    courseId: z.string().min(1, "Course ID is required"),
    courseName: z.string().min(1, "Course name is required"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validation = registerCertSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({
                error: validation.error.issues[0].message
            }, { status: 400 });
        }

        const { userId, userName, courseId, courseName } = validation.data;

        await dbConnect();

        // Check if certificate already exists for this user and course
        const existing = await Certificate.findOne({ userId, courseId });
        if (existing) {
            return NextResponse.json({ 
                certificateId: existing.certificateId,
                verificationToken: existing.verificationToken
            });
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

        return NextResponse.json({ 
            certificateId: newCertificate.certificateId,
            verificationToken: newCertificate.verificationToken
        });
    } catch (error) {
        console.error('Certification Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
