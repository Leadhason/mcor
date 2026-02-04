-- Rename rhythms to tasks and enhance for Kanban support
ALTER TABLE IF EXISTS public.rhythms RENAME TO tasks;

-- Add Kanban-specific columns
ALTER TABLE public.tasks 
ADD COLUMN IF NOT EXISTS project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'done')),
ADD COLUMN IF NOT EXISTS priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
ADD COLUMN IF NOT EXISTS due_date timestamp with time zone,
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

-- Update RLS policies (renaming policy names is optional but good for clarity)
DROP POLICY IF EXISTS "Users can manage their own rhythms" ON public.tasks;
CREATE POLICY "Users can manage their own tasks" 
ON public.tasks FOR ALL 
USING (auth.uid() = user_id);

-- Update Realtime publication
ALTER PUBLICATION supabase_realtime DROP TABLE public.rhythms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;
