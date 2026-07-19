import { Mail, MapPin, Edit3 } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

import { useLanguage } from '@/lib/language-context';

const BUDGET_LABELS: Record<string, string> = {
  'under-10k': 'Under ₹10,000',
  '10k-50k': '₹10,000 - ₹50,000',
  '50k-1lakh': '₹50,000 - ₹1 Lakh',
  '1lakh-5lakh': '₹1 Lakh - ₹5 Lakh',
  '5lakh-10lakh': '₹5 Lakh - ₹10 Lakh',
  'above-10lakh': 'Above ₹10 Lakh',
};

function formatBudget(budget: string | null | undefined): string {
  if (!budget) return 'Not set';
  return BUDGET_LABELS[budget] || budget;
}

interface ProfileHeaderProps {
  user: any;
  onEditClick: () => void;
}

export default function ProfileHeader({ user, onEditClick }: ProfileHeaderProps) {
  const { t } = useLanguage();
  const joinDate = user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently';

  let skills: string[] = [];
  let timeCommitment = '';
  try {
    if (user.work_experience) {
      const parsed = JSON.parse(user.work_experience);
      skills = parsed.skills || [];
      timeCommitment = parsed.time_commitment || '';
    }
  } catch (e) {
    // legacy format
  }

  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-teal-500/20 text-teal-500 border border-teal-500/30 flex items-center justify-center text-3xl font-bold uppercase shadow-neon-teal shrink-0">
            {user.full_name ? user.full_name.charAt(0) : user.email?.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {user.full_name || t('profile.entrepreneur')}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-500 dark:text-slate-400 mt-2 text-sm">
              <span className="flex items-center gap-1.5"><Mail size={14}/> {user.email}</span>
              {user.city && (
                <>
                  <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14}/> {user.city}</span>
                </>
              )}
            </div>
            <div className="mt-2 text-xs font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 w-fit px-2.5 py-1 rounded-full border border-teal-100 dark:border-teal-800">
              {t('profile.memberSince')} {joinDate}
            </div>
          </div>
        </div>
        
        <button 
          onClick={onEditClick}
          className="flex items-center justify-center gap-2 text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-400 bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-900/30 border border-transparent hover:border-teal-200 dark:hover:border-teal-800 px-4 py-2.5 rounded-xl transition-all font-semibold text-sm w-full sm:w-auto shrink-0 shadow-sm self-start sm:self-center"
        >
          <Edit3 size={16} /> {t('profile.editProfile')}
        </button>
      </div>

      {/* Details Row */}
      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {user.business_interest ? user.business_interest.split(',').map((i: string) => (
              <span key={i.trim()} className="px-2.5 py-1 rounded-md bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 text-xs font-semibold border border-teal-200 dark:border-teal-800/50">
                {i.trim()}
              </span>
            )) : <span className="text-sm text-slate-400">None set</span>}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? skills.map((s: string) => (
              <span key={s} className="px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-xs font-semibold border border-purple-200 dark:border-purple-800/50">
                {s}
              </span>
            )) : <span className="text-sm text-slate-400">None set</span>}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Resources</h3>
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span className="text-slate-500 font-medium mr-1">Budget:</span>
            {formatBudget(user.investment_budget)}
          </div>
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
            <span className="text-slate-500 font-medium mr-1">Time:</span>
            {timeCommitment || 'Not set'}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
