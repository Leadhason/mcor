-- Add settings-related columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone_number text,
ADD COLUMN IF NOT EXISTS two_factor_enabled boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS login_alerts_enabled boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS theme_preference text DEFAULT 'dark';

-- Create billing table for trial tracking
CREATE TABLE IF NOT EXISTS public.user_billing (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    plan text DEFAULT 'free_trial',
    trial_start_date timestamp with time zone DEFAULT now(),
    trial_end_date timestamp with time zone DEFAULT (now() + interval '30 days'),
    created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on user_billing
ALTER TABLE public.user_billing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own billing" 
ON public.user_billing FOR SELECT 
USING (auth.uid() = user_id);

-- Automation: Create billing record on profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user_billing()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_billing (user_id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_created_billing ON public.profiles;

CREATE TRIGGER on_profile_created_billing
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_billing();
