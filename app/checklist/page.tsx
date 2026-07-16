'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import { Checklist, ChecklistTask, BusinessIdea } from '@/types/database';
import TaskItem from '@/components/checklist/task-item';
import ProgressBar from '@/components/checklist/progress-bar';
import { FileText, Bot } from 'lucide-react';
import Link from 'next/link';

function ChecklistContent() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const ideaId = searchParams.get('idea');
  
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [tasks, setTasks] = useState<ChecklistTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    if (!isAuthenticated || !user) {
      router.push('/?login=true');
      return;
    }

    loadOrCreateChecklist();
  }, [isAuthenticated, user, authLoading, ideaId]);

  const loadOrCreateChecklist = async () => {
    try {
      setLoading(true);
      // Try to find an existing checklist for this user and idea
      let query = supabase.from('checklists').select('*').eq('user_id', user!.id);
      
      if (ideaId) {
        query = query.eq('business_idea_id', parseInt(ideaId));
      }

      const { data: existingChecklists } = await query;

      if (existingChecklists && existingChecklists.length > 0) {
        // Load existing
        const cl = existingChecklists[0];
        setChecklist(cl);
        
        const { data: existingTasks } = await supabase
          .from('checklist_tasks')
          .select('*')
          .eq('checklist_id', cl.id)
          .order('sort_order');
          
        setTasks(existingTasks || []);
      } else if (ideaId) {
        // Create new checklist based on idea
        const { data: idea } = await supabase
          .from('business_ideas')
          .select('*')
          .eq('id', parseInt(ideaId))
          .single();

        if (idea) {
          const { data: newChecklist } = await supabase
            .from('checklists')
            .insert({
              user_id: user!.id,
              business_idea_id: idea.id,
              title: `${idea.title} Launch Plan`
            })
            .select()
            .single();

          if (newChecklist) {
            setChecklist(newChecklist);
            
            // Generate tasks
            const newTasks = [];
            let order = 1;
            
            // 1. Generic setup
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'Business Name Registration',
              description: 'Register your business name and entity (Proprietorship, LLP, or Pvt Ltd).',
              category: 'Registration',
              estimated_time: '1-2 Weeks',
              sort_order: order++,
            });
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'Open Current Bank Account',
              description: 'Open a business bank account to keep personal and business finances separate.',
              category: 'Finance',
              estimated_time: '2-4 Days',
              sort_order: order++,
            });
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'Udyam Registration (MSME)',
              description: 'Get your MSME certificate for government subsidies and priority sector lending.',
              category: 'Registration',
              estimated_time: '1 Day',
              resource_link: 'https://udyamregistration.gov.in/',
              sort_order: order++,
            });

            // 2. Idea specific licenses
            if (idea.required_licenses && idea.required_licenses.length > 0) {
              for (const license of idea.required_licenses) {
                newTasks.push({
                  checklist_id: newChecklist.id,
                  title: `Obtain ${license}`,
                  description: `Required specific license for ${idea.title}.`,
                  category: 'Licenses',
                  estimated_time: 'Variable',
                  sort_order: order++,
                });
              }
            }

            // Insert tasks
            const { data: insertedTasks } = await supabase
              .from('checklist_tasks')
              .insert(newTasks)
              .select()
              .order('sort_order');
              
            setTasks(insertedTasks || []);
          }
        }
      } else {
        // No idea provided and no existing checklists
        setChecklist(null);
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    // Optimistic update
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus as any } : t));
    
    // Sync to DB
    await supabase
      .from('checklist_tasks')
      .update({ status: newStatus })
      .eq('id', taskId);
  };

  if (loading || authLoading) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-700"></div>
        <p className="mt-4 text-slate-500 font-medium">Loading your checklist...</p>
      </div>
    );
  }

  if (!checklist) {
    return (
      <div className="text-center py-20 px-4">
        <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">No Active Checklist</h2>
        <p className="text-slate-600 mb-8 max-w-sm mx-auto">
          Explore our business ideas and generate a custom launch checklist to track your progress.
        </p>
        <Link href="/ideas" className="bg-teal-700 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-800 transition-colors">
          Explore Ideas
        </Link>
      </div>
    );
  }

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  
  // Group tasks by category
  const categories = Array.from(new Set(tasks.map(t => t.category)));
  const groupedTasks = categories.map(cat => ({
    category: cat,
    tasks: tasks.filter(t => t.category === cat).sort((a, b) => a.sort_order - b.sort_order)
  }));

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">{checklist.title}</h1>
        <p className="text-slate-500 mb-6 font-medium">Track your steps from idea to launch.</p>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <ProgressBar completed={completedCount} total={tasks.length} />
          
          {completedCount === tasks.length && tasks.length > 0 && (
            <div className="mt-4 bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 flex items-start gap-3">
              <span className="text-2xl">🎉</span>
              <div>
                <h4 className="font-bold">You're ready to launch!</h4>
                <p className="text-sm font-medium opacity-90">All essential tasks are complete. Need help marketing? Ask Vyapar Mitra!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {groupedTasks.map(group => (
          <div key={group.category}>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <div className="w-2 h-6 bg-amber-500 rounded-full"></div>
              {group.category}
            </h3>
            <div className="space-y-1">
              {group.tasks.map(task => (
                <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-slate-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center gap-6 shadow-xl">
        <div className="w-16 h-16 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot size={32} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-xl font-bold mb-1">Stuck on a step?</h4>
          <p className="text-slate-300 text-sm">Vyapar Mitra can guide you through any registration or compliance process.</p>
        </div>
        <Link href={`/chat?idea=${checklist.business_idea_id}`} className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-6 rounded-xl transition-colors whitespace-nowrap w-full md:w-auto text-center">
          Ask for Help
        </Link>
      </div>
    </div>
  );
}

export default function ChecklistPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <ChecklistContent />
      </Suspense>
    </div>
  );
}
