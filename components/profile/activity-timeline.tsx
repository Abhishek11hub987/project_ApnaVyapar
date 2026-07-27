import { GlassCard } from '@/components/ui/glass-card';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';

export default function ActivityTimeline() {
  const { t } = useLanguage();

  return (
    <GlassCard className="relative overflow-hidden">
      <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 mb-8">
        <CheckCircle2 size={20} className="text-gray-500" /> {t('timeline.title')}
      </h3>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gray-200">
        
        {/* Placeholder Timeline Item 1 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-500 border-2 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
            <CheckCircle2 size={16} />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 bg-white border border-gray-100 rounded-lg shadow-card hover:shadow-elevated hover:border-gray-200 transition-all">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-gray-900">{t('timeline.joinedTitle')}</h4>
              <span className="text-sm text-gray-400">{t('timeline.joinedDate')}</span>
            </div>
            <p className="text-sm text-gray-600">{t('timeline.joinedDesc')}</p>
          </div>
        </div>

      </div>
    </GlassCard>
  );
}
