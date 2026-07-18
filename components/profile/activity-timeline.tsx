import { GlassCard } from '@/components/ui/glass-card';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function ActivityTimeline() {
  const { t } = useLanguage();

  return (
    <GlassCard>
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-6">
        <CheckCircle2 size={20} className="text-teal-500" /> {t('timeline.title')}
      </h3>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-teal-500/30 before:to-transparent">
        
        {/* Placeholder Timeline Item 1 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-50 dark:border-slate-900 bg-teal-500 text-slate-50 shadow-neon-teal shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            <CheckCircle2 size={16} />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">{t('timeline.joinedTitle')}</h4>
            </div>
            <p className="text-sm text-slate-500">{t('timeline.joinedDesc')}</p>
          </div>
        </div>

      </div>
    </GlassCard>
  );
}
