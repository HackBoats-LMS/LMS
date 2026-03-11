import { NextResponse } from "next/server";
import supabase from "@/lib/db";
import redis from "@/lib/redis"; // Import Redis client

export async function GET() {
    try {
        // Try Redis Cache first
        if (redis) {
            const cachedData = await redis.get('lms_leaderboard_v2');
            if (cachedData) {
                return NextResponse.json({ success: true, data: JSON.parse(cachedData), source: 'cache' });
            }
        }

        // 1. Fetch Normal Progress Data (All-time progress for normal display)
        const { data: progressData, error: progressError } = await supabase
            .from('progress')
            .select('userEmail, score, completed');

        if (progressError) throw progressError;

        // 2. Fetch Users
        const { data: usersData, error: usersError } = await supabase
            .from('users')
            .select('email, fullName');

        if (usersError) throw usersError;

        // 3. Aggregate Scores & Modules Completed
        const userStatsMap: Record<string, { totalXP: number; email: string; fullName: string; modulesCompleted: number }> = {};

        usersData.forEach(user => {
            userStatsMap[user.email] = {
                email: user.email,
                fullName: user.fullName || "Unknown User",
                totalXP: 0,
                modulesCompleted: 0
            };
        });

        progressData.forEach(p => {
            if (userStatsMap[p.userEmail] && (p.completed || p.score >= 60)) {
                userStatsMap[p.userEmail].modulesCompleted += 1;
                // Award 20 XP per module completed (matching the logic in page.tsx)
                userStatsMap[p.userEmail].totalXP += 20;
            }
        });

        // We can also rank by total modules completed or pure XP
        // Convert map to array and sort by XP descending
        let leaderboard = Object.values(userStatsMap)
            .filter(u => u.totalXP > 0) // Only show users with XP
            .sort((a, b) => b.totalXP - a.totalXP)
            .slice(0, 10); // Top 10

        // Calculate seconds until NEXT Monday at 00:00:00 for the cache expiration
        const now = new Date();
        const nextMonday = new Date(now);
        // If today is Monday (1), it adds 7 days. If Sunday (0), it adds 1 day.
        nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7 || 7));
        nextMonday.setHours(0, 0, 0, 0);

        const ttlSeconds = Math.floor((nextMonday.getTime() - now.getTime()) / 1000);

        // Set Redis Cache to strictly expire on next Monday
        if (redis && leaderboard) {
            await redis.set('lms_leaderboard_v2', JSON.stringify(leaderboard), 'EX', ttlSeconds);
        }

        return NextResponse.json({ success: true, data: leaderboard, source: 'db' }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
    } catch (error: any) {
        console.error('GET /api/leaderboard error:', error);
        return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
    }
}
