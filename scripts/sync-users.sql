-- This script will sync users from auth.users to public.users
-- It will create entries for any auth users that don't have a corresponding record in the users table

-- First, let's create a temporary table with all auth users
CREATE TEMP TABLE temp_auth_users AS
SELECT 
  id,
  email,
  raw_user_meta_data->>'first_name' as first_name,
  raw_user_meta_data->>'last_name' as last_name,
  created_at,
  updated_at
FROM auth.users;

-- Now, insert any missing users into the public.users table
INSERT INTO public.users (id, email, first_name, last_name, created_at, updated_at)
SELECT 
  t.id,
  t.email,
  t.first_name,
  t.last_name,
  t.created_at,
  t.updated_at
FROM temp_auth_users t
LEFT JOIN public.users u ON t.id = u.id
WHERE u.id IS NULL;

-- Drop the temporary table
DROP TABLE temp_auth_users;

-- Output the count of users in both tables
SELECT 'auth.users' as table_name, COUNT(*) as count FROM auth.users
UNION ALL
SELECT 'public.users' as table_name, COUNT(*) as count FROM public.users;

