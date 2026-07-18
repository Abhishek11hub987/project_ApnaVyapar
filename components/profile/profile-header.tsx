import { Mail, MapPin, Edit3 } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

interface ProfileHeaderProps {
  user: any;
  onEditClick: () => void;
}

export default function ProfileHeader({ user, onEditClick }: ProfileHeaderProps) {
  const joinDate = user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently';

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
              {user.full_name || 'Entrepreneur'}
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
              Member since {joinDate}
            </div>
          </div>
        </div>
        
        <button 
          onClick={onEditClick}
          className="flex items-center justify-center gap-2 text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-400 bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-900/30 border border-transparent hover:border-teal-200 dark:hover:border-teal-800 px-4 py-2.5 rounded-xl transition-all font-semibold text-sm w-full sm:w-auto shrink-0 shadow-sm"
        >
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>
    </GlassCard>
  );
}
