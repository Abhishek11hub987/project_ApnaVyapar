-- Add is_admin to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Create platform_messages table
CREATE TABLE platform_messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE platform_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a message
CREATE POLICY "Anyone can insert platform messages" 
ON platform_messages FOR INSERT 
WITH CHECK (true);

-- Only admins can view and update messages
CREATE POLICY "Admins can view messages" 
ON platform_messages FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = true
    )
);

CREATE POLICY "Admins can update messages" 
ON platform_messages FOR UPDATE 
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = true
    )
);
