import { GlassCard } from '@/components/ui/glass-card';
import { VyaparScore } from '@/components/vyapar-score';
import { useLanguage } from '@/lib/language-context';

interface StatsGridProps {
  stats: {
    ideas: number;
    chats: number;
    checklists: number;
    locations: number;
  };
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const { t } = useLanguage();

  return (
    <GlassCard className="!p-0 overflow-hidden flex flex-col h-full">
      {/* Vyapar Score Section */}
      <div className="flex flex-col items-center justify-center p-6 border-b border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30">
        <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">{t('stats.vyaparScore')}</h2>
        <VyaparScore size={140} />
      </div>

      {/* Stats 2x2 Grid */}
      <div className="p-3 bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-300 text-sm text-center">
        {t('stats.activityStats')}
      </div>
      <div className="grid grid-cols-2 divide-x divide-y divide-slate-200 dark:divide-slate-800/50 flex-1 bg-white/50 dark:bg-slate-950/50">
        <div className="p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex flex-col items-center justify-center">
          <span className="block text-2xl font-bold neon-text-teal text-teal-500">{stats.ideas}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1">{t('stats.ideas')}</span>
        </div>
        <div className="p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex flex-col items-center justify-center">
          <span className="block text-2xl font-bold neon-text-amber text-amber-500">{stats.chats}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1">{t('stats.chats')}</span>
        </div>
        <div className="p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-t border-slate-200 dark:border-slate-800/50 flex flex-col items-center justify-center">
          <span className="block text-2xl font-bold neon-text-teal text-teal-500">{stats.checklists}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1">{t('stats.checklists')}</span>
        </div>
        <div className="p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-t border-slate-200 dark:border-slate-800/50 flex flex-col items-center justify-center">
          <span className="block text-2xl font-bold neon-text-amber text-amber-500">{stats.locations}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1">{t('stats.locations')}</span>
        </div>
      </div>
    </GlassCard>
  );
}

