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
    <GlassCard className="relative overflow-hidden bg-navy-light/40 border-cyan/20 shadow-[0_0_30px_rgba(45,212,191,0.05)] group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan/20 transition-colors duration-700" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-cyan/10 text-cyan border border-cyan/30 flex items-center justify-center text-3xl font-black uppercase shadow-[0_0_15px_rgba(45,212,191,0.2)] shrink-0">
            {user.full_name ? user.full_name.charAt(0) : user.email?.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              {user.full_name || t('profile.entrepreneur')}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-white/60 mt-2 text-sm font-medium">
              <span className="flex items-center gap-1.5"><Mail size={14}/> {user.email}</span>
              {user.city && (
                <>
                  <span className="hidden sm:inline text-white/30">•</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14}/> {user.city}</span>
                </>
              )}
            </div>
            <div className="mt-3 text-xs font-bold text-cyan bg-cyan/10 w-fit px-3 py-1.5 rounded-full border border-cyan/20 uppercase tracking-wider">
              {t('profile.memberSince')} {joinDate}
            </div>
          </div>
        </div>
        
        <button 
          onClick={onEditClick}
          className="flex items-center justify-center gap-2 text-white hover:text-cyan bg-white/5 hover:bg-cyan/10 border border-white/10 hover:border-cyan/30 px-5 py-2.5 rounded-xl transition-all font-bold text-sm w-full sm:w-auto shrink-0 shadow-sm self-start sm:self-center"
        >
          <Edit3 size={16} /> {t('profile.editProfile')}
        </button>
      </div>

      {/* Details Row */}
      <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div>
          <h3 className="text-xs font-black text-white/40 uppercase tracking-wider mb-3">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {user.business_interest ? user.business_interest.split(',').map((i: string) => (
              <span key={i.trim()} className="px-3 py-1 rounded-lg bg-cyan/10 text-cyan text-xs font-bold border border-cyan/20">
                {i.trim()}
              </span>
            )) : <span className="text-sm text-white/40">None set</span>}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black text-white/40 uppercase tracking-wider mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? skills.map((s: string) => (
              <span key={s} className="px-3 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">
                {s}
              </span>
            )) : <span className="text-sm text-white/40">None set</span>}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black text-white/40 uppercase tracking-wider mb-3">Resources</h3>
          <div className="text-sm font-bold text-white">
            <span className="text-white/50 font-medium mr-2">Budget:</span>
            {formatBudget(user.investment_budget)}
          </div>
          <div className="text-sm font-bold text-white mt-2">
            <span className="text-white/50 font-medium mr-2">Time:</span>
            {timeCommitment || 'Not set'}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
