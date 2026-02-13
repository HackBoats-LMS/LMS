// This script is no longer used for Supabase as indexes should be created via SQL migrations.
// To setup TTL index in Supabase, run the following SQL:
// CREATE INDEX leaves_expires_at_idx ON leaves (expires_at);
// Note: Supabase/Postgres doesn't support TTL indexes natively like MongoDB. You'd use pg_cron or similar.

async function setupLeaveCollection() {
  console.log("For Supabase, please use SQL Editor to create indexes.");
}

setupLeaveCollection();
