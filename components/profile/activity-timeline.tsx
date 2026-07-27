import { GlassCard } from '@/components/ui/glass-card';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function ActivityTimeline() {
  const { t } = useLanguage();

  return (
    <GlassCard className="bg-navy-light/40 border-cyan/20 shadow-[0_0_30px_rgba(45,212,191,0.05)] relative overflow-hidden">
      <div className="absolute -left-32 -top-32 w-64 h-64 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <h3 className="text-lg font-black text-white flex items-center gap-2 mb-8 relative z-10">
        <CheckCircle2 size={20} className="text-cyan" /> {t('timeline.title')}
      </h3>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-cyan/30 before:to-transparent z-10">
        
        {/* Placeholder Timeline Item 1 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-navy-light bg-cyan/20 text-cyan shadow-[0_0_15px_rgba(45,212,191,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
            <CheckCircle2 size={16} />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-sm hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-white/90">{t('timeline.joinedTitle')}</h4>
            </div>
            <p className="text-sm text-white/60 font-medium">{t('timeline.joinedDesc')}</p>
          </div>
        </div>

      </div>
    </GlassCard>
  );
}
