'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import Logo from '@/components/logo';

const INTERESTS = ['Food', 'Technology', 'Retail', 'Services', 'Health', 'Education', 'Fashion', 'Manufacturing', 'Agriculture', 'Transportation'];
const SKILLS = ['Marketing', 'Sales', 'Cooking', 'Coding', 'Management', 'Design', 'Customer Service', 'Finance', 'Logistics', 'Writing'];

export default function OnboardingPage() {
  const { user, isAuthenticated, isLoading, initialize } = useAuth();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    city: '',
    budget: '',
    time: 'Full-time',
    interests: [] as string[],
    skills: [] as string[],
  });
  const [saving, setSaving] = useState(false);

  // If already onboarded, redirect
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.onboarding_completed) {
        router.push('/ideas');
      } else {
        setFormData(prev => ({
          ...prev,
          full_name: user.full_name || '',
          phone: user.phone || '',
          city: user.city || '',
        }));
      }
    }
  }, [user, isAuthenticated, isLoading, router]);

  if (isLoading || !user) return null;

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const toggleArray = (field: 'interests' | 'skills', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(i => i !== value)
        : [...prev[field], value]
    }));
  };

  const handleComplete = async () => {
    setSaving(true);
    try {
      // We store skills and time in work_experience as JSON to avoid DB schema alterations
      const workExperienceData = JSON.stringify({
        skills: formData.skills,
        time_commitment: formData.time
      });

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          city: formData.city,
          investment_budget: parseInt(formData.budget) || 0,
          business_interest: formData.interests.join(', '),
          work_experience: workExperienceData,
          onboarding_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      
      await initialize(); // Refresh auth context
      router.push('/ideas');
    } catch (err) {
      console.error(err);
      alert('Failed to save profile.');
      setSaving(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Welcome! Let's get to know you.</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={formData.full_name}
                  onChange={e => setFormData({...formData, full_name: e.target.value})}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  placeholder="e.g. Abhishek Yadav"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  placeholder="+91 9876543210"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">City</label>
                <input 
                  type="text" 
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  placeholder="e.g. Jaipur, Rajasthan"
                />
              </div>
            </div>
            <button onClick={handleNext} disabled={!formData.full_name} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-colors">
              Continue <ArrowRight size={18}/>
            </button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">What are your interests?</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Select the industries you want to explore.</p>
            <div className="flex flex-wrap gap-3">
              {INTERESTS.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleArray('interests', interest)}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-bold transition-all ${
                    formData.interests.includes(interest) 
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400' 
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-teal-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={handlePrev} className="p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <ArrowLeft size={18}/>
              </button>
              <button onClick={handleNext} disabled={formData.interests.length === 0} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-colors">
                Continue <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Your Resources</h2>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Investment Budget (₹)</label>
              <input 
                type="number" 
                value={formData.budget}
                onChange={e => setFormData({...formData, budget: e.target.value})}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                placeholder="e.g. 50000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Time Commitment</label>
              <div className="grid grid-cols-2 gap-3">
                {['Full-time', 'Part-time', 'Weekends only'].map(t => (
                  <button
                    key={t}
                    onClick={() => setFormData({...formData, time: t})}
                    className={`px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                      formData.time === t 
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400' 
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={handlePrev} className="p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <ArrowLeft size={18}/>
              </button>
              <button onClick={handleNext} disabled={!formData.budget} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-colors">
                Continue <ArrowRight size={18}/>
              </button>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Any skills?</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Select skills you already have.</p>
            <div className="flex flex-wrap gap-3">
              {SKILLS.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleArray('skills', skill)}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-bold transition-all ${
                    formData.skills.includes(skill) 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' 
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-purple-200'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={handlePrev} disabled={saving} className="p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <ArrowLeft size={18}/>
              </button>
              <button onClick={handleComplete} disabled={saving} className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-teal-500/30 transition-all">
                {saving ? 'Saving...' : <><Sparkles size={18}/> Complete Setup</>}
              </button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Logo iconSize={40} />
      </div>
      <div className="w-full max-w-md bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-slate-800">
          <motion.div 
            className="h-full bg-teal-500" 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
}
