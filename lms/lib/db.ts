import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Invalid/Missing environment variable: "NEXT_PUBLIC_SUPABASE_URL"');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Use Service Role Key if available (server-side only) to bypass RLS
// Otherwise fall back to Anon Key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  throw new Error('Invalid/Missing environment variable: "NEXT_PUBLIC_SUPABASE_ANON_KEY" or "SUPABASE_SERVICE_ROLE_KEY"');
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
