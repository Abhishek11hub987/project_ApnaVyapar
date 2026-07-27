'use client';
import { useLanguage } from '@/lib/i18n/language-context';
import { Globe, LogOut } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

interface SettingsPanelProps {
  onLogout: () => void;
}

export default function SettingsPanel({ onLogout }: SettingsPanelProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <GlassCard className="!p-0 overflow-hidden">
      <div className="p-5 border-b border-gray-100 font-medium text-gray-500 tracking-wide">
        {t('settings.title')}
      </div>
      <div className="p-3 space-y-2">
        <button 
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-3 text-gray-700 font-medium">
            <Globe size={20} className="text-gray-500"/>
            {t('settings.language')}
          </div>
          <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">{language === 'en' ? 'English' : 'Hindi'}</span>
        </button>

        <div className="h-px bg-gray-100 my-2 mx-4" />
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-4 hover:bg-red-50 text-red-500 font-medium rounded-lg transition-colors"
        >
          <LogOut size={20} />
          {t('settings.logout')}
        </button>
      </div>
    </GlassCard>
  );
}
