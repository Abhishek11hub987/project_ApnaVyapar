'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import { User, Mail, MapPin, Briefcase, GraduationCap, IndianRupee, LogOut, Save, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading: authLoading, logout, setUser, initialize } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [education, setEducation] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [businessInterest, setBusinessInterest] = useState('');
  const [investmentBudget, setInvestmentBudget] = useState('');

  useEffect(() => {
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
    // Populate form from profile
    setFullName(user.full_name || '');
    setEmail(user.email || '');
    setCity(user.city || '');
    setState(user.state || '');
    setEducation(user.education || '');
    setWorkExperience(user.work_experience || '');
    setBusinessInterest(user.business_interest || '');
    setInvestmentBudget(user.investment_budget || '');
  }, [user, isAuthenticated, authLoading]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSaved(false);

    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        email,
        city,
        state,
        education,
        work_experience: workExperience,
        business_interest: businessInterest,
        investment_budget: investmentBudget || null,
      })
      .eq('id', user.id)
      .select()
      .single();

    if (data && !error) {
      setUser(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (authLoading) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-700 dark:border-teal-400"></div>
        <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium">Loading your profile...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32 transition-colors">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-8 pb-6 px-4 shadow-sm">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900/40 rounded-full flex items-center justify-center text-teal-700 dark:text-teal-400 font-extrabold text-xl">
              {fullName ? fullName.charAt(0).toUpperCase() : <User size={24} />}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{fullName || 'Your Profile'}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{email || 'Complete your profile to get personalized recommendations'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {saved && (
          <div className="mb-6 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-3 animate-fade-in-up">
            <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400" />
            <span className="font-semibold">Profile saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Personal Info */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5 flex items-center gap-2">
              <User size={14} /> Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" size={16} />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                      placeholder="Mumbai"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    placeholder="Maharashtra"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business Info */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5 flex items-center gap-2">
              <Briefcase size={14} /> Business Background
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Education</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" size={16} />
                  <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    placeholder="B.Com, MBA, etc."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Work Experience</label>
                <input
                  type="text"
                  value={workExperience}
                  onChange={(e) => setWorkExperience(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  placeholder="e.g., 2 years in marketing"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Business Interest</label>
                <input
                  type="text"
                  value={businessInterest}
                  onChange={(e) => setBusinessInterest(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  placeholder="e.g., Food, Technology, Services"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Investment Budget</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" size={16} />
                  <select
                    value={investmentBudget}
                    onChange={(e) => setInvestmentBudget(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 appearance-none"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-10k">Under ₹10,000</option>
                    <option value="10k-50k">₹10,000 - ₹50,000</option>
                    <option value="50k-2l">₹50,000 - ₹2,00,000</option>
                    <option value="2l-10l">₹2,00,000 - ₹10,00,000</option>
                    <option value="above-10l">Above ₹10,00,000</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-teal-700 dark:bg-teal-600 hover:bg-teal-800 dark:hover:bg-teal-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-teal-700/20 dark:shadow-teal-900/40 hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Profile
              </>
            )}
          </button>
        </form>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 border border-transparent hover:border-red-200 dark:hover:border-red-800/50"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </main>
  );
}
