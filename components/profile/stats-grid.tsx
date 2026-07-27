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
    <GlassCard className="!p-0 overflow-hidden flex flex-col h-full bg-navy-light/40 border-cyan/20 shadow-[0_0_30px_rgba(45,212,191,0.05)] relative group">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan/5 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Vyapar Score Section */}
      <div className="flex flex-col items-center justify-center p-8 border-b border-white/10 bg-white/5 relative z-10">
        <h2 className="text-sm font-black text-white/50 uppercase tracking-widest mb-4">{t('stats.vyaparScore')}</h2>
        <div className="relative">
          <div className="absolute inset-0 bg-cyan/20 blur-2xl rounded-full scale-150" />
          <VyaparScore size={140} />
        </div>
      </div>

      {/* Stats 2x2 Grid */}
      <div className="p-3 bg-white/5 border-b border-white/10 font-bold text-white/70 text-sm text-center relative z-10">
        {t('stats.activityStats')}
      </div>
      <div className="grid grid-cols-2 divide-x divide-y divide-white/10 flex-1 bg-navy/30 relative z-10">
        <div className="p-6 text-center hover:bg-white/5 transition-colors flex flex-col items-center justify-center group/stat cursor-default">
          <span className="block text-3xl font-black text-cyan drop-shadow-[0_0_10px_rgba(45,212,191,0.5)] group-hover/stat:scale-110 transition-transform">{stats.ideas}</span>
          <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold mt-2">{t('stats.ideas')}</span>
        </div>
        <div className="p-6 text-center hover:bg-white/5 transition-colors flex flex-col items-center justify-center group/stat cursor-default">
          <span className="block text-3xl font-black text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] group-hover/stat:scale-110 transition-transform">{stats.chats}</span>
          <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold mt-2">{t('stats.chats')}</span>
        </div>
        <div className="p-6 text-center hover:bg-white/5 transition-colors border-t border-white/10 flex flex-col items-center justify-center group/stat cursor-default">
          <span className="block text-3xl font-black text-cyan drop-shadow-[0_0_10px_rgba(45,212,191,0.5)] group-hover/stat:scale-110 transition-transform">{stats.checklists}</span>
          <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold mt-2">{t('stats.checklists')}</span>
        </div>
        <div className="p-6 text-center hover:bg-white/5 transition-colors border-t border-white/10 flex flex-col items-center justify-center group/stat cursor-default">
          <span className="block text-3xl font-black text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] group-hover/stat:scale-110 transition-transform">{stats.locations}</span>
          <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold mt-2">{t('stats.locations')}</span>
        </div>
      </div>
    </GlassCard>
  );
}

