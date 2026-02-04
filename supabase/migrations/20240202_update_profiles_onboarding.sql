-- Add path and focus columns to profiles
alter table public.profiles 
add column if not null path text,
add column if not null focus text[];

-- Note: In a production environment, we'd use a separate table for focus areas for better normalization, 
-- but for this "Quiet Control Room" MVP, an array on the profile is efficient and fast.
