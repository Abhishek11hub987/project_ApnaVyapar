const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
    email: 'test@example.com',
    password: 'password'
  });
  
  if (authError) {
    console.error('Auth error', authError);
    return;
  }
  
  console.log('User:', user.id);
  
  // try inserting a checklist
  const { data: checklist, error: clError } = await supabase.from('checklists').insert({
    user_id: user.id,
    title: 'Test Checklist',
  }).select().single();
  
  if (clError) {
    console.error('CL error', clError);
    return;
  }
  console.log('CL created:', checklist.id);
  
  // try inserting a task
  const { data: task, error: tError } = await supabase.from('checklist_tasks').insert({
    checklist_id: checklist.id,
    title: 'Test task',
    category: 'Marketing'
  }).select();
  
  if (tError) {
    console.error('Task error', tError);
  } else {
    console.log('Task created', task);
  }
}

test();
