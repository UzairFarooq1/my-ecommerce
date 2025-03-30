-- This script will insert the current user into the users table
-- Replace the placeholders with actual values

INSERT INTO public.users (
  id, 
  email, 
  first_name, 
  last_name, 
  created_at, 
  updated_at
)
VALUES (
  'YOUR_USER_ID_HERE', -- Replace with the actual user ID from auth.users
  'your.email@example.com', -- Replace with the actual email
  'First', -- Replace with the actual first name
  'Last', -- Replace with the actual last name
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE
SET 
  email = EXCLUDED.email,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  updated_at = NOW();

