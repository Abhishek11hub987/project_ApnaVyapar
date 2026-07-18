'use client';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/lib/language-context';
import { Moon, Sun, Globe, LogOut } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

interface SettingsPanelProps {
  onLogout: () => void;
}

export default function SettingsPanel({ onLogout }: SettingsPanelProps) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <GlassCard className="!p-0 overflow-hidden">
      <div className="p-4 bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-300">
        {t('settings.title')}
      </div>
      <div className="p-2 space-y-1">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-medium">
            {theme === 'dark' ? <Sun size={20} className="text-amber-500"/> : <Moon size={20} className="text-indigo-500"/>}
            {t('settings.theme')}
          </div>
          <span className="text-sm text-slate-400 capitalize">{theme || t('settings.system')}</span>
        </button>
        
        <button 
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-medium">
            <Globe size={20} className="text-blue-500"/>
            {t('settings.language')}
          </div>
          <span className="text-sm text-slate-400 uppercase">{language === 'en' ? 'English' : 'Hindi'}</span>
        </button>

        <div className="h-px bg-slate-200 dark:bg-slate-800/50 my-2 mx-4" />
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-4 hover:bg-red-50 dark:hover:bg-red-900/10 text-red-600 dark:text-red-500 font-bold rounded-xl transition-colors"
        >
          <LogOut size={20} />
          {t('settings.logout')}
        </button>
      </div>
    </GlassCard>
  );
}
