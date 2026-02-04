-- Enhance projects table with metadata
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS priority text DEFAULT 'medium',
ADD COLUMN IF NOT EXISTS due_date timestamp with time zone,
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- Create tasks table for project management
CREATE TABLE IF NOT EXISTS public.tasks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  status text DEFAULT 'todo', -- todo, in_progress, completed
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on Tasks
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own tasks" 
ON public.tasks FOR ALL 
USING (auth.uid() = user_id);

-- Update Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;
