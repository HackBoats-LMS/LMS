import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUsers() {
    console.log("Checking Supabase connection...");

    // 1. Describe table (or just select first row to see keys)
    const { data: oneUser, error: err1 } = await supabase
        .from('users')
        .select('*')
        .limit(1);

    if (err1) {
        console.error("Error fetching user:", err1);
        return;
    }

    if (oneUser && oneUser.length > 0) {
        console.log("Table columns available:", Object.keys(oneUser[0]));
    } else {
        console.log("No users found in table.");
    }

    // 2. Fetch latest 10
    const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false }) // trying snake_case first as it's standard in DBs
        .limit(10);

    if (error) {
        console.log("Order by 'created_at' failed, trying 'createdAt'...");
        const { data: users2, error: error2 } = await supabase
            .from('users')
            .select('*')
            .order('createdAt', { ascending: false })
            .limit(10);

        if (error2) {
            console.error("Both orderings failed. Fetching without order:");
            const { data: users3 } = await supabase.from('users').select('*').limit(10);
            console.table(users3);
        } else {
            console.log("Latest users (by createdAt):");
            console.table(users2.map(u => ({ email: u.email, fullName: u.fullName, createdAt: u.createdAt, created_at: u.created_at })));
        }
    } else {
        console.log("Latest users (by created_at):");
        console.table(users.map(u => ({ email: u.email, fullName: u.fullName, createdAt: u.createdAt, created_at: u.created_at })));
    }
}

checkUsers();
