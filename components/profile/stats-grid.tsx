import { GlassCard } from '@/components/ui/glass-card';
import { VyaparScore } from '@/components/vyapar-score';
import { useLanguage } from '@/lib/i18n/language-context';

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
    <GlassCard className="!p-0 overflow-hidden flex flex-col h-full group">
      {/* Vyapar Score Section */}
      <div className="flex flex-col items-center justify-center p-8 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">{t('stats.vyaparScore')}</h2>
        <VyaparScore size={140} />
      </div>

      {/* Stats 2x2 Grid */}
      <div className="p-3 border-b border-gray-100 font-medium text-gray-500 text-sm text-center">
        {t('stats.activityStats')}
      </div>
      <div className="grid grid-cols-2 divide-x divide-y divide-gray-100 flex-1">
        <div className="p-6 text-center flex flex-col items-center justify-center cursor-default">
          <span className="text-2xl font-bold text-gray-900">{stats.ideas}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t('stats.ideas')}</span>
        </div>
        <div className="p-6 text-center flex flex-col items-center justify-center cursor-default">
          <span className="text-2xl font-bold text-gray-900">{stats.chats}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t('stats.chats')}</span>
        </div>
        <div className="p-6 text-center flex flex-col items-center justify-center cursor-default">
          <span className="text-2xl font-bold text-gray-900">{stats.checklists}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t('stats.checklists')}</span>
        </div>
        <div className="p-6 text-center flex flex-col items-center justify-center cursor-default">
          <span className="text-2xl font-bold text-gray-900">{stats.locations}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t('stats.locations')}</span>
        </div>
      </div>
    </GlassCard>
  );
}

