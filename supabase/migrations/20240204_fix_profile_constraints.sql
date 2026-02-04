-- Fix profiles table constraints to allow signup to succeed before onboarding
ALTER TABLE public.profiles 
ALTER COLUMN path DROP NOT NULL,
ALTER COLUMN focus DROP NOT NULL;

-- Ensure the signup trigger is robust
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, onboarded)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'New User'), 
    new.raw_user_meta_data->>'avatar_url',
    false
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
