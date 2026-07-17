'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import { Checklist, ChecklistTask, BusinessIdea } from '@/types/database';
import TaskItem from '@/components/tasks/task-item';
import ProgressBar from '@/components/tasks/progress-bar';
import { FileText, Bot } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';

function TasksContent() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const ideaId = searchParams.get('idea');
  const { t } = useLanguage();
  
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
          const { data: newChecklist, error: checklistInsertError } = await supabase
            .from('checklists')
            .insert({
              user_id: user!.id,
              business_idea_id: idea.id,
              title: `${idea.title} Launch Plan`
            })
            .select()
            .single();

          if (checklistInsertError) {
            console.error('Error inserting checklist:', checklistInsertError);
          }

          if (newChecklist) {
            setChecklist(newChecklist);
            
            // Generate enhanced 5-phase tasks
            const newTasks = [];
            let order = 1;
            
            // Phase 1: Planning
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'Market Research & Validation',
              description: 'Research local competition and validate your pricing model.',
              category: 'Phase 1: Planning',
              estimated_time: '1 Week',
              sort_order: order++,
            });
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'Finalize Business Plan & Budget',
              description: 'Calculate your exact initial investment and monthly operating costs.',
              category: 'Phase 1: Planning',
              estimated_time: '3 Days',
              sort_order: order++,
            });

            // Phase 2: Legal & Registration
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'Business Name Registration',
              description: 'Register your entity (Proprietorship, LLP, or Pvt Ltd).',
              category: 'Phase 2: Legal',
              estimated_time: '1-2 Weeks',
              resource_link: 'https://www.mca.gov.in/',
              sort_order: order++,
            });
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'Udyam Registration (MSME)',
              description: 'Get your free MSME certificate for government subsidies and priority lending.',
              category: 'Phase 2: Legal',
              estimated_time: '1 Day',
              resource_link: 'https://udyamregistration.gov.in/',
              sort_order: order++,
            });
            
            // Add GST if applicable (Most businesses need it eventually)
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'GST Registration',
              description: 'Required if turnover exceeds ₹40 Lakhs (₹20L for services) or for interstate/online sales.',
              category: 'Phase 2: Legal',
              estimated_time: '1 Week',
              resource_link: 'https://www.gst.gov.in/',
              sort_order: order++,
            });

            // Add specific licenses from DB
            if (idea.required_licenses && idea.required_licenses.length > 0) {
              for (const license of idea.required_licenses) {
                let link = null;
                if (license.toLowerCase().includes('fssai')) link = 'https://foscos.fssai.gov.in/';
                if (license.toLowerCase().includes('trade license')) link = 'https://www.india.gov.in/';
                
                newTasks.push({
                  checklist_id: newChecklist.id,
                  title: `Obtain ${license}`,
                  description: `Required mandatory license for operating a ${idea.title}.`,
                  category: 'Phase 2: Legal',
                  estimated_time: '2-4 Weeks',
                  resource_link: link,
                  sort_order: order++,
                });
              }
            }

            // Phase 3: Finance
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'Open Current Bank Account',
              description: 'Keep personal and business finances strictly separate.',
              category: 'Phase 3: Finance',
              estimated_time: '2-4 Days',
              sort_order: order++,
            });
            
            // Phase 4: Operations
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'Source Equipment & Inventory',
              description: 'Purchase initial supplies and set up your workspace/location.',
              category: 'Phase 4: Operations',
              estimated_time: '1-2 Weeks',
              sort_order: order++,
            });

            // Phase 5: Marketing
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'Create Digital Presence',
              description: 'Set up WhatsApp Business, Google My Business, and Instagram.',
              category: 'Phase 5: Marketing',
              estimated_time: '2 Days',
              resource_link: 'https://business.google.com/',
              sort_order: order++,
            });

            // Insert tasks
            const { data: insertedTasks, error: taskInsertError } = await supabase
              .from('checklist_tasks')
              .insert(newTasks)
              .select()
              .order('sort_order');
            
            if (taskInsertError) {
              console.error('Error inserting tasks:', taskInsertError);
            }
              
            setTasks(insertedTasks || []);
          } else {
             console.error('Failed to create new checklist');
          }
        } else {
           console.error('Idea not found for id:', ideaId);
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-700 dark:border-teal-400"></div>
        <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium">Loading your checklist...</p>
      </div>
    );
  }

  if (!checklist) {
    return (
      <div className="text-center py-20 px-4">
        <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">{t('checklist.noActive')}</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm mx-auto">
          {t('checklist.noActiveDesc')}
        </p>
        <Link href="/ideas" className="bg-teal-700 dark:bg-teal-600 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-800 dark:hover:bg-teal-500 transition-colors">
          {t('checklist.exploreIdeas')}
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
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">{checklist.title}</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">Track your steps from idea to launch.</p>
        
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <ProgressBar completed={completedCount} total={tasks.length} />
          
          {completedCount === tasks.length && tasks.length > 0 && (
            <div className="mt-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/50 flex items-start gap-3">
              <span className="text-2xl">🎉</span>
              <div>
                <h4 className="font-bold">{t('checklist.ready')}</h4>
                <p className="text-sm font-medium opacity-90">{t('checklist.readyDesc')}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {groupedTasks.map(group => (
          <div key={group.category}>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <div className="w-2 h-6 bg-amber-500 dark:bg-amber-600 rounded-full"></div>
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
      
      <div className="mt-12 bg-slate-900 p-6 rounded-2xl text-white flex flex-col md:flex-row items-center gap-6 shadow-xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-10 text-teal-400">
          <Bot size={150} />
        </div>
        <div className="w-16 h-16 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
          <Bot size={32} />
        </div>
        <div className="flex-1 text-center md:text-left relative z-10">
          <h4 className="text-xl font-bold mb-1">Stuck on a step?</h4>
          <p className="text-slate-300 text-sm">Vyapar Mitra can guide you through any registration or compliance process.</p>
        </div>
        <Link href={`/chat?idea=${checklist.business_idea_id}`} className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-6 rounded-xl transition-colors whitespace-nowrap w-full md:w-auto text-center relative z-10">
          Ask for Help
        </Link>
      </div>
    </div>
  );
}

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32 transition-colors">
      <Suspense fallback={<div className="p-8 text-center text-slate-500 dark:text-slate-400">Loading...</div>}>
        <TasksContent />
      </Suspense>
    </div>
  );
}
