-- Drop the existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Recreate the function with all fields
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the user already exists in the users table
  IF EXISTS (SELECT 1 FROM public.users WHERE id = NEW.id) THEN
    -- User already exists, update their information
    UPDATE public.users
    SET 
      email = NEW.email,
      first_name = NEW.raw_user_meta_data->>'first_name',
      last_name = NEW.raw_user_meta_data->>'last_name',
      phone = NEW.raw_user_meta_data->>'phone',
      address = NEW.raw_user_meta_data->>'address',
      city = NEW.raw_user_meta_data->>'city',
      postal_code = NEW.raw_user_meta_data->>'postal_code',
      country = NEW.raw_user_meta_data->>'country',
      updated_at = NOW()
    WHERE id = NEW.id;
  ELSE
    -- User doesn't exist, insert a new record
    INSERT INTO public.users (
      id, 
      email, 
      first_name, 
      last_name, 
      phone,
      address,
      city,
      postal_code,
      country,
      created_at, 
      updated_at
    )
    VALUES (
      NEW.id, 
      NEW.email,
      NEW.raw_user_meta_data->>'first_name',
      NEW.raw_user_meta_data->>'last_name',
      NEW.raw_user_meta_data->>'phone',
      NEW.raw_user_meta_data->>'address',
      NEW.raw_user_meta_data->>'city',
      NEW.raw_user_meta_data->>'postal_code',
      NEW.raw_user_meta_data->>'country',
      NOW(),
      NOW()
    );
  END IF;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error (this will appear in Supabase logs)
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Also create a trigger for updates to keep the tables in sync
DROP FUNCTION IF EXISTS public.handle_user_updated();
CREATE OR REPLACE FUNCTION public.handle_user_updated() 
RETURNS TRIGGER AS $$
BEGIN
  -- Update the user record in the users table
  UPDATE public.users
  SET 
    email = NEW.email,
    first_name = NEW.raw_user_meta_data->>'first_name',
    last_name = NEW.raw_user_meta_data->>'last_name',
    phone = NEW.raw_user_meta_data->>'phone',
    address = NEW.raw_user_meta_data->>'address',
    city = NEW.raw_user_meta_data->>'city',
    postal_code = NEW.raw_user_meta_data->>'postal_code',
    country = NEW.raw_user_meta_data->>'country',
    updated_at = NOW()
  WHERE id = NEW.id;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error
    RAISE LOG 'Error in handle_user_updated: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the update trigger
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
AFTER UPDATE ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_user_updated();

