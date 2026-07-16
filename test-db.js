const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDB() {
  console.log("Testing business_ideas...");
  const { data: ideas, error: ideaErr } = await supabase.from('business_ideas').select('*');
  console.log('Ideas Count:', ideas?.length);
  if (ideaErr) console.error('Ideas Error:', ideaErr);
  else if (ideas?.length > 0) console.log('First Idea:', ideas[0].title);

  console.log("\nTesting chat_sessions...");
  const { data: sessions, error: sessErr } = await supabase.from('chat_sessions').select('*').limit(1);
  console.log('Sessions Error:', sessErr);

  console.log("\nTesting profiles...");
  const { data: profiles, error: profErr } = await supabase.from('profiles').select('*').limit(1);
  console.log('Profiles Error:', profErr);
}

testDB();
