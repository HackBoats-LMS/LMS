import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

const CACHE_KEY = 'students:all';
const CACHE_TTL = 3600; // 1 hour

export async function GET() {
    try {
        // 1. Try Redis Cache
        if (redis) {
            const cached = await redis.get(CACHE_KEY);
            if (cached) {
                return NextResponse.json({ ok: true, data: JSON.parse(cached), source: 'cache' });
            }
        }

        // 2. Fetch from DB
        const { data: users, error } = await supabase
            .from('users')
            .select('id, email, fullName, phoneNumber, currentSemester, isAdmin, createdAt')
            .order('createdAt', { ascending: false });

        if (error) throw error;

        // 3. Set Redis Cache
        if (redis && users) {
            await redis.set(CACHE_KEY, JSON.stringify(users), 'EX', CACHE_TTL);
        }

        return NextResponse.json({ ok: true, data: users || [], source: 'db' });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}
