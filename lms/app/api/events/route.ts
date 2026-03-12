import { NextResponse } from "next/server";
import supabase from "@/lib/db";
import redis from "@/lib/redis";

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
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { error } = await supabase
            .from('events')
            .insert([body]);

        if (error) throw error;

        // Invalidate Cache
        if (redis) {
            await redis.del(CACHE_KEY);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('POST /api/events error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
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
            await redis.del(CACHE_KEY);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('DELETE /api/events error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('events')
            .update(updateData)
            .eq('id', id);

        if (error) throw error;

        // Invalidate Cache
        if (redis) {
            await redis.del(CACHE_KEY);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('PUT /api/events error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
