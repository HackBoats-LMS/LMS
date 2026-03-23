import { NextResponse } from "next/server";
import supabase from "@/lib/db";
import redis from "@/lib/redis";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

import { z } from "zod";

const eventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    date: z.string().optional(),
    location: z.string().optional(),
    image_url: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

const CACHE_KEY = 'events:list';
const CACHE_TTL = 60 * 60; // 1 hour

export async function GET() {
    try {
        // 1. Try Redis Cache
        if (redis) {
            const cached = await redis.get(CACHE_KEY);
            if (cached) {
                return NextResponse.json({ success: true, data: JSON.parse(cached), source: 'cache' });
            }
        }

        // 2. Fetch from Supabase
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: false }); // Removed limit to support full listing

        if (error) {
            console.error('Supabase Events Error:', error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        // 3. Set Redis Cache
        if (redis && data) {
            await redis.set(CACHE_KEY, JSON.stringify(data), 'EX', CACHE_TTL);
        }

        return NextResponse.json({ success: true, data: data || [], source: 'db' });
    } catch (error: any) {
        console.error('API Events Error:', error);
        return NextResponse.json({ 
            success: false, 
            error: process.env.NODE_ENV === "production" ? "Internal Server Error" : 'Internal Server Error' 
        }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.isAdmin) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const validation = eventSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({
                success: false,
                error: validation.error.issues[0].message
            }, { status: 400 });
        }

        const { error } = await supabase
            .from('events')
            .insert([validation.data]);

        if (error) throw error;

        // Invalidate Cache
        if (redis) {
            try {
                await redis.del(CACHE_KEY);
            } catch (redisError) {
                console.error('POST /api/events: Redis invalidation failed:', redisError);
            }
        }

        // Audit Logging
        console.log(`[AUDIT] Action: CREATE_EVENT, Actor: ${session.user.email}, Target: ${validation.data.title}, Time: ${new Date().toISOString()}`);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('POST /api/events error:', error);
        return NextResponse.json({ 
            success: false, 
            error: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message 
        }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.isAdmin) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', id);

        if (error) throw error;

        // Invalidate Cache
        if (redis) {
            try {
                await redis.del(CACHE_KEY);
            } catch (redisError) {
                console.error('DELETE /api/events: Redis invalidation failed:', redisError);
            }
        }

        // Audit Logging
        console.log(`[AUDIT] Action: DELETE_EVENT, Actor: ${session.user.email}, Target: ${id}, Time: ${new Date().toISOString()}`);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('DELETE /api/events error:', error);
        return NextResponse.json({ 
            success: false, 
            error: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message 
        }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.isAdmin) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
        }

        const validation = eventSchema.partial().safeParse(updateData);
        if (!validation.success) {
            return NextResponse.json({
                success: false,
                error: validation.error.issues[0].message
            }, { status: 400 });
        }

        const { error } = await supabase
            .from('events')
            .update(validation.data)
            .eq('id', id);

        if (error) throw error;

        // Invalidate Cache
        if (redis) {
            try {
                await redis.del(CACHE_KEY);
            } catch (redisError) {
                console.error('PUT /api/events: Redis invalidation failed:', redisError);
            }
        }

        // Audit Logging
        console.log(`[AUDIT] Action: UPDATE_EVENT, Actor: ${session.user.email}, Target: ${id}, Time: ${new Date().toISOString()}`);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('PUT /api/events error:', error);
        return NextResponse.json({ 
            success: false, 
            error: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message 
        }, { status: 500 });
    }
}
