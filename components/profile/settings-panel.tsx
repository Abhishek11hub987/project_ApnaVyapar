'use client';
import { useLanguage } from '@/lib/language-context';
import { Globe, LogOut } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

interface SettingsPanelProps {
  onLogout: () => void;
}

export default function SettingsPanel({ onLogout }: SettingsPanelProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <GlassCard className="!p-0 overflow-hidden bg-navy-light/40 border-cyan/20 shadow-[0_0_30px_rgba(45,212,191,0.05)]">
      <div className="p-5 bg-white/5 border-b border-white/10 font-bold text-white/70 tracking-wide">
        {t('settings.title')}
      </div>
      <div className="p-3 space-y-2">
        <button 
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/10 rounded-xl transition-colors focus-ring"
        >
          <div className="flex items-center gap-3 text-white/90 font-bold">
            <Globe size={20} className="text-cyan"/>
            {t('settings.language')}
          </div>
          <span className="text-sm font-bold text-cyan bg-cyan/10 px-3 py-1 rounded-full uppercase tracking-wider">{language === 'en' ? 'English' : 'Hindi'}</span>
        </button>

        <div className="h-px bg-white/10 my-2 mx-4" />
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-4 hover:bg-red-500/10 text-red-400 font-black rounded-xl transition-colors focus-ring"
        >
          <LogOut size={20} />
          {t('settings.logout')}
        </button>
      </div>
    </GlassCard>
  );
}
