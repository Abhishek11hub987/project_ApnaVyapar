-- Add role column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role text default 'user';

-- Enable RLS on signup_analytics if not already enabled
ALTER TABLE signup_analytics ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Admin read access" ON signup_analytics;
DROP POLICY IF EXISTS "Admin profile read" ON profiles;
DROP POLICY IF EXISTS "User own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

-- Create new policies
-- Only admins can read signup_analytics
CREATE POLICY "Admin read access" ON signup_analytics
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- Only admins can read all profiles
CREATE POLICY "Admin profile read" ON profiles
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- Regular users can only read their own profile
CREATE POLICY "User own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
