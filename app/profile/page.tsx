'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import { LogOut, CheckCircle2, User, Mail, MapPin, Heart } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { GlassCard } from '@/components/ui/glass-card';
import { NeonButton } from '@/components/ui/neon-button';
import { VyaparScore } from '@/components/vyapar-score';
import { useTheme } from 'next-themes';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading: authLoading, logout, initialize } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ chats: 0, checklists: 0, ideas: 12, locations: 3 });
  const [savedIdeas, setSavedIdeas] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    if (!authLoading) initialize();
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated || !user) {
      router.push('/?login=true');
      return;
    }
    const fetchStats = async () => {
      const [{ count: chatsCount }, { count: checkCount }, { data: savedData }] = await Promise.all([
        supabase.from('chat_sessions').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('checklists').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('saved_ideas').select('*, business_ideas(*)').eq('user_id', user.id).order('created_at', { ascending: false })
      ]);
      setStats(prev => ({ ...prev, chats: chatsCount || 0, checklists: checkCount || 0 }));
      if (savedData) setSavedIdeas(savedData);
    };
    fetchStats();
  }, [user, isAuthenticated, authLoading]);

  if (!mounted || authLoading || !user) return null;

  return (
    <main className="min-h-screen bg-transparent pb-24 font-sans pt-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Gamification & Stats */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard className="flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Vyapar Score</h2>
            <VyaparScore size={160} />
          </GlassCard>

          <GlassCard className="!p-0 overflow-hidden">
            <div className="p-4 bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-300">
              Activity Stats
            </div>
            <div className="grid grid-cols-2 divide-x divide-y divide-slate-200 dark:divide-slate-800/50">
              <div className="p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <span className="block text-2xl font-bold neon-text-teal text-teal-500">{savedIdeas.length}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Saved Ideas</span>
              </div>
              <div className="p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <span className="block text-2xl font-bold neon-text-amber text-amber-500">{stats.chats}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Chats</span>
              </div>
              <div className="p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-t border-slate-200 dark:border-slate-800/50">
                <span className="block text-2xl font-bold neon-text-teal text-teal-500">{stats.checklists}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Checklists</span>
              </div>
              <div className="p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-t border-slate-200 dark:border-slate-800/50">
                <span className="block text-2xl font-bold neon-text-amber text-amber-500">{stats.locations}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Locations</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: User Info & Timeline */}
        <div className="lg:col-span-8 space-y-6">
          <GlassCard className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center text-2xl font-bold uppercase shadow-neon-teal">
                  {user.full_name ? user.full_name.charAt(0) : user.email?.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{user.full_name || 'Entrepreneur'}</h1>
                  <div className="flex items-center gap-4 text-slate-500 mt-1 text-sm">
                    <span className="flex items-center gap-1"><Mail size={14}/> {user.email}</span>
                    {user.city && <span className="flex items-center gap-1"><MapPin size={14}/> {user.city}</span>}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => { logout(); router.push('/'); }}
                className="flex items-center gap-2 text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-colors font-bold text-xs uppercase tracking-wider"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-6">
              <Heart size={20} className="text-rose-500" /> My Saved Ideas
            </h3>
            
            {savedIdeas.length === 0 ? (
              <p className="text-slate-500 text-sm italic p-4 text-center bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                You haven't saved any ideas yet. Head over to Idea Roulette to swipe and save!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedIdeas.map((saved) => (
                  <div key={saved.id} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-teal-500/30 transition-colors cursor-pointer" onClick={() => router.push(`/ideas/${saved.business_ideas?.slug}`)}>
                    <div className="w-16 h-16 rounded-lg bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0 flex items-center justify-center relative">
                      {saved.business_ideas?.image_url && !saved.business_ideas.image_url.startsWith('http') && !saved.business_ideas.image_url.startsWith('/') ? (
                        <span className="text-3xl">{saved.business_ideas.image_url}</span>
                      ) : (
                        <img 
                          src={saved.business_ideas?.image_url} 
                          alt={saved.business_ideas?.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm line-clamp-1">{saved.business_ideas?.title}</h4>
                      <p className="text-xs text-teal-500 font-semibold">{saved.business_ideas?.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-6">
              <CheckCircle2 size={20} className="text-teal-500" /> Activity Timeline
            </h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-teal-500/30 before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-50 dark:border-slate-900 bg-teal-500 text-slate-50 shadow-neon-teal shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <CheckCircle2 size={16} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Joined Apna Vyapar</h4>
                  </div>
                  <p className="text-sm text-slate-500">Your entrepreneurial journey began!</p>
                </div>
              </div>

            </div>
          </GlassCard>
        </div>

      </div>
    </main>
  );
}
