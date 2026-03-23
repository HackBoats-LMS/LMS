import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Certificate from '@/lib/models/Certificate';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const token = searchParams.get('token');

        if (!id) {
            return NextResponse.json({ error: 'Missing certificate ID' }, { status: 400 });
        }

        await dbConnect();

        const certificate = await Certificate.findOne({ certificateId: id });

        if (!certificate) {
            return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
        }

        // If no token, only return public data
        if (!token || certificate.verificationToken !== token) {
            return NextResponse.json({
                userName: certificate.userName,
                courseName: certificate.courseName,
                issueDate: certificate.issueDate,
                certificateId: certificate.certificateId,
                isPublic: true
            });
        }

        return NextResponse.json(certificate);
    } catch (error) {
        console.error('Verification Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
