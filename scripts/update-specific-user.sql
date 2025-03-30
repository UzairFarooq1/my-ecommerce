-- This script will update a specific user with all fields
-- Replace the placeholders with actual values

UPDATE public.users
SET 
  phone = 'YOUR_PHONE_NUMBER', -- Replace with actual phone number
  address = 'YOUR_ADDRESS', -- Replace with actual address
  city = 'YOUR_CITY', -- Replace with actual city
  postal_code = 'YOUR_POSTAL_CODE', -- Replace with actual postal code
  country = 'YOUR_COUNTRY', -- Replace with actual country
  updated_at = NOW()
WHERE id = 'YOUR_USER_ID'; -- Replace with the actual user ID

-- Verify the update
SELECT * FROM public.users WHERE id = 'YOUR_USER_ID';

