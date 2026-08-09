import { Mail, MapPin, Edit3 } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

import { useLanguage } from '@/lib/i18n/language-context';

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
    <GlassCard className="relative overflow-hidden group">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gray-100 text-gray-500 border border-gray-200 flex items-center justify-center text-3xl font-black uppercase shrink-0">
            {user.full_name ? user.full_name.charAt(0) : user.email?.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              {user.full_name || t('profile.entrepreneur')}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-500 mt-2 text-sm">
              <span className="flex items-center gap-1.5"><Mail size={14}/> {user.email}</span>
              {user.city && (
                <>
                  <span className="hidden sm:inline text-gray-300">•</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14}/> {user.city}</span>
                </>
              )}
            </div>
            <div className="mt-3 text-xs font-medium text-gray-600 bg-gray-100 w-fit px-3 py-1.5 rounded-full">
              {t('profile.memberSince')} {joinDate}
            </div>
          </div>
        </div>
        
        <button 
          onClick={onEditClick}
          className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-lg transition-all font-medium text-sm w-full sm:w-auto shrink-0 self-start sm:self-center"
        >
          <Edit3 size={16} /> {t('profile.editProfile')}
        </button>
      </div>

      {/* Details Row */}
      <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {user.business_interest ? user.business_interest.split(',').map((i: string) => (
              <span key={i.trim()} className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {i.trim()}
              </span>
            )) : <span className="text-sm text-gray-400">None set</span>}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? skills.map((s: string) => (
              <span key={s} className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {s}
              </span>
            )) : <span className="text-sm text-gray-400">None set</span>}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Resources</h3>
          <div className="text-sm text-gray-900">
            <span className="text-gray-500 mr-2">Budget:</span>
            {formatBudget(user.investment_budget)}
          </div>
          <div className="text-sm text-gray-900 mt-2">
            <span className="text-gray-500 mr-2">Time:</span>
            {timeCommitment || 'Not set'}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
