const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
    email: 'test@example.com',
    password: 'password'
  });
  
  const { data } = await supabase.from('chat_sessions').select('messages').limit(1);
  console.log(typeof data[0]?.messages);
  console.log(data[0]?.messages);
}

test();
