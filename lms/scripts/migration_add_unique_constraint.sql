-- Run this in Supabase SQL Editor to enable upserts and prevent duplicate progress rows

-- 1. Remove duplicate (keeping latest or highest score one)
-- Assuming id exists and is auto-incrementing, keeping the highest ID (most recent)
DELETE FROM progress p1 USING progress p2
WHERE p1.id < p2.id 
  AND p1."userEmail" = p2."userEmail" 
  AND p1.subject = p2.subject 
  AND p1."unitId" = p2."unitId" 
  AND p1."moduleId" = p2."moduleId";

-- 2. Add Unique Constraint
ALTER TABLE progress 
ADD CONSTRAINT unique_progress_attempt 
UNIQUE ("userEmail", subject, "unitId", "moduleId");
