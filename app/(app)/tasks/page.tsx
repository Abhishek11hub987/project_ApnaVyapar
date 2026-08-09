'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import type { Checklist, ChecklistTask } from '@/types/checklist';
import type { BusinessIdea } from '@/types/idea';
import TaskItem from '@/components/tasks/task-item';
import ProgressBar from '@/components/tasks/progress-bar';
import { FileText, Bot, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/language-context';

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
      
      const ideaIdNum = ideaId ? parseInt(ideaId, 10) : NaN;
      if (!isNaN(ideaIdNum)) {
        query = query.eq('business_idea_id', ideaIdNum);
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
      const parsedIdeaId = parseInt(ideaId || '', 10);
        if (isNaN(parsedIdeaId)) {
          setLoading(false);
          return;
        }
        const { data: idea } = await supabase
          .from('business_ideas')
          .select('*')
          .eq('id', parsedIdeaId)
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
              category: 'Marketing',
              estimated_time: '1 Week',
              sort_order: order++,
            });
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'Finalize Business Plan & Budget',
              description: 'Calculate your exact initial investment and monthly operating costs.',
              category: 'Finance',
              estimated_time: '3 Days',
              sort_order: order++,
            });

            // Phase 2: Legal & Registration
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'Business Name Registration',
              description: 'Register your entity (Proprietorship, LLP, or Pvt Ltd).',
              category: 'Registration',
              estimated_time: '1-2 Weeks',
              resource_link: 'https://www.mca.gov.in/',
              sort_order: order++,
            });
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'Udyam Registration (MSME)',
              description: 'Get your free MSME certificate for government subsidies and priority lending.',
              category: 'Registration',
              estimated_time: '1 Day',
              resource_link: 'https://udyamregistration.gov.in/',
              sort_order: order++,
            });
            
            // Add GST if applicable (Most businesses need it eventually)
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'GST Registration',
              description: 'Required if turnover exceeds ₹40 Lakhs (₹20L for services) or for interstate/online sales.',
              category: 'Registration',
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
                  category: 'Licenses',
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
              category: 'Finance',
              estimated_time: '2-4 Days',
              sort_order: order++,
            });
            
            // Phase 4: Operations
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'Source Equipment & Inventory',
              description: 'Purchase initial supplies and set up your workspace/location.',
              category: 'Operations',
              estimated_time: '1-2 Weeks',
              sort_order: order++,
            });

            // Phase 5: Marketing
            newTasks.push({
              checklist_id: newChecklist.id,
              title: 'Create Digital Presence',
              description: 'Set up WhatsApp Business, Google My Business, and Instagram.',
              category: 'Marketing',
              estimated_time: '2 Days',
              resource_link: 'https://business.google.com/',
              sort_order: order++,
            });

            // Insert tasks
            const { data: insertedTasks, error: taskInsertError } = await supabase
              .from('checklist_tasks')
              .insert(newTasks)
              .select();
            
            if (taskInsertError) {
              console.error('Error inserting tasks:', taskInsertError);
            } else if (insertedTasks) {
              // Sort them in memory
              insertedTasks.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
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
    setTasks(tasks.map((t: any) => t.id === taskId ? { ...t, status: newStatus as any } : t));
    
    // Sync to DB
    await supabase
      .from('checklist_tasks')
      .update({ status: newStatus })
      .eq('id', taskId);
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteChecklist = async () => {
    if (!checklist) return;
    setIsDeleting(true);
    const prevChecklist = checklist;
    const prevTasks = tasks;
    setChecklist(null);
    setTasks([]);
    const { error } = await supabase.from('checklist_tasks').delete().eq('checklist_id', checklist.id);
    if (!error) {
      await supabase.from('checklists').delete().eq('id', checklist.id);
    }
    if (error) {
      setChecklist(prevChecklist);
      setTasks(prevTasks);
    }
    setIsDeleting(false);
    setShowDeleteConfirm(false);
    if (!error) {
      router.push('/ideas');
    }
  };

  if (loading || authLoading) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-accent-200 border-t-accent-600"></div>
        <p className="mt-4 text-gray-500 font-medium">Loading your checklist...</p>
      </div>
    );
  }

  if (!checklist) {
    return (
      <div className="text-center py-20 px-4">
        <div className="w-20 h-20 bg-accent-50 text-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileText size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('checklist.noActive')}</h2>
        <p className="text-slate-600 mb-8 max-w-sm mx-auto">
          {t('checklist.noActiveDesc')}
        </p>
        <Link href="/ideas" className="btn-primary py-3 px-8">
          {t('checklist.exploreIdeas')}
        </Link>
      </div>
    );
  }

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  
  // Group tasks by category
  const categories = Array.from(new Set(tasks.map((t: any) => t.category)));
  const groupedTasks = categories.map((cat: any) => ({
    category: cat,
    tasks: tasks.filter(t => t.category === cat).sort((a, b) => a.sort_order - b.sort_order)
  }));

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-3">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{checklist.title}</h1>
          {showDeleteConfirm ? (
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
              <span className="text-sm text-gray-500 font-medium px-2">Are you sure?</span>
              <button 
                onClick={handleDeleteChecklist}
                disabled={isDeleting}
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors text-sm font-bold disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="text-gray-500 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors text-sm font-bold"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm font-bold border border-transparent hover:border-red-100"
              title="Delete Checklist"
            >
              <Trash2 size={18} />
              <span className="hidden sm:inline">Delete</span>
            </button>
          )}
        </div>
        <p className="text-gray-500 mb-8 font-medium text-lg">Track your steps from idea to launch.</p>
        
        <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-card p-6 md:p-8">
          <ProgressBar completed={completedCount} total={tasks.length} />
          
          {completedCount === tasks.length && tasks.length > 0 && (
            <div className="mt-4 bg-green-50 text-green-800 p-4 rounded-xl border border-green-100 flex items-start gap-3">
              <span className="text-2xl">🎉</span>
              <div>
                <h4 className="font-bold">{t('checklist.ready')}</h4>
                <p className="text-sm font-medium opacity-90">{t('checklist.readyDesc')}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-10">
        {groupedTasks.map((group: any) => (
          <div key={group.category} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-accent-500 to-indigo-500 rounded-full"></div>
              {group.category}
            </h3>
            <div className="space-y-3">
              {group.tasks.map((task: any) => (
                <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center gap-6 relative overflow-hidden shadow-elevated">
        <div className="absolute -top-10 -right-10 opacity-[0.05] text-white">
          <Bot size={180} />
        </div>
        <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10 backdrop-blur-sm border border-white/10">
          <Bot size={32} />
        </div>
        <div className="flex-1 text-center md:text-left relative z-10">
          <h4 className="text-2xl font-black mb-2 tracking-tight">Stuck on a step?</h4>
          <p className="text-gray-300 text-base font-medium">Vyapar Mitra can guide you through any registration or compliance process.</p>
        </div>
        <Link href={`/chat?idea=${checklist.business_idea_id}`} className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-3.5 px-8 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all w-full md:w-auto text-center relative z-10">
          Ask for Help
        </Link>
      </div>
    </div>
  );
}

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-surface-secondary pb-32 transition-colors">
      <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}>
        <TasksContent />
      </Suspense>
    </div>
  );
}
