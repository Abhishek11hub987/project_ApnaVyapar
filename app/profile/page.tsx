'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import { User, Mail, MapPin, Briefcase, GraduationCap, IndianRupee, LogOut, Save, CheckCircle2, MessageSquare, Lightbulb, CheckSquare, Compass, Settings, Sun, Moon, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { useTheme } from 'next-themes';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading: authLoading, logout, setUser, initialize } = useAuth();
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Stats
  const [stats, setStats] = useState({ chats: 0, checklists: 0, ideas: 12, locations: 3 });

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    setMounted(true);
    if (!authLoading) {
      initialize();
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated || !user) {
      router.push('/?login=true');
      return;
    }
    setFullName(user.full_name || '');
    setEmail(user.email || '');
    setCity(user.city || '');
    setPhone(user.phone || '');

    // Fetch real stats
    const fetchStats = async () => {
      const [{ count: chatsCount }, { count: checkCount }] = await Promise.all([
        supabase.from('chat_sessions').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('checklists').select('*', { count: 'exact', head: true }).eq('user_id', user.id)
      ]);
      setStats(prev => ({ ...prev, chats: chatsCount || 0, checklists: checkCount || 0 }));
    };
    fetchStats();
  }, [user, isAuthenticated, authLoading]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSaved(false);

    const { data, error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, city, phone })
      .eq('id', user.id)
      .select()
      .single();

    if (!error && data) {
      setUser(data);
      setSaved(true);
      setIsEditing(false);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (!mounted || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      {/* Header Profile Section */}
      <div className="bg-teal-700 dark:bg-teal-900 pt-10 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center text-3xl font-bold text-teal-700 dark:text-teal-400 border-4 border-white/20">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              fullName?.substring(0, 1).toUpperCase() || 'U'
            )}
          </div>
          <div className="text-center md:text-left text-white flex-1">
            <h1 className="text-3xl font-bold tracking-tight mb-1">{fullName || 'Complete Your Profile'}</h1>
            <p className="text-teal-100/80 mb-3 flex items-center justify-center md:justify-start gap-2">
              <Mail size={14} /> {email}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-sm font-medium">
              <span className="bg-teal-800/50 px-3 py-1 rounded-full">
                Member since {new Date(user.created_at || Date.now()).getFullYear()}
              </span>
              <button onClick={() => setIsEditing(true)} className="bg-white/10 hover:bg-white/20 px-4 py-1 rounded-full transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20 space-y-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <Lightbulb size={20} />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.ideas}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Ideas Viewed</div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3">
              <MessageSquare size={20} />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.chats}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Chat Sessions</div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <CheckSquare size={20} />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.checklists}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Checklists</div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <Compass size={20} />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.locations}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Locations</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-teal-600" /> Recent Activity
            </h3>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <CheckSquare size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Generated Checklist</h4>
                      <span className="text-xs font-medium text-slate-400">Today</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Home-Based Tiffin Service</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <MessageSquare size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Chatted with Mitra</h4>
                      <span className="text-xs font-medium text-slate-400">Yesterday</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Discussed Digital Marketing Agency</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Settings size={20} className="text-teal-600" /> Settings
            </h3>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-2">
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-medium">
                  {theme === 'dark' ? <Moon size={20} className="text-indigo-400"/> : <Sun size={20} className="text-amber-500"/>}
                  Theme Mode
                </div>
                <span className="text-sm text-slate-400 capitalize">{theme || 'System'}</span>
              </button>
              
              <button 
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-medium">
                  <Globe size={20} className="text-blue-500"/>
                  Language
                </div>
                <span className="text-sm text-slate-400 uppercase">{language === 'en' ? 'English' : 'Hindi'}</span>
              </button>

              <div className="h-px bg-slate-200 dark:bg-slate-800 my-2 mx-4" />
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-4 hover:bg-red-50 dark:hover:bg-red-900/10 text-red-600 dark:text-red-500 font-bold rounded-xl transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-scale-in">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <LogOut size={20} className="rotate-180" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 outline-none focus:border-teal-500"
                />
              </div>
              <button 
                type="submit" 
                disabled={saving}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl mt-4 flex justify-center"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
