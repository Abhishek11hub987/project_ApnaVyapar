const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkIdeas() {
  const { data, error } = await supabase.from('business_ideas').select('*').eq('is_active', true);
  console.log('Active Ideas:', data?.length);
  if (error) console.error(error);
}
checkIdeas();
