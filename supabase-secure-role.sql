-- 1. Create a function to prevent role modifications from the client
CREATE OR REPLACE FUNCTION prevent_role_modification()
RETURNS TRIGGER AS $$
BEGIN
  -- auth.role() returns 'authenticated' when called from the Next.js client
  IF auth.role() = 'authenticated' THEN
    -- Silently discard any attempt to change the role
    NEW.role = OLD.role; 
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Attach the trigger to the profiles table
DROP TRIGGER IF EXISTS enforce_role_security ON profiles;
CREATE TRIGGER enforce_role_security
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION prevent_role_modification();
