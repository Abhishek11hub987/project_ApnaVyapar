'use client';
import { LogOut } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

interface SettingsPanelProps {
  onLogout: () => void;
}

export default function SettingsPanel({ onLogout }: SettingsPanelProps) {
  return (
    <GlassCard className="!p-0 overflow-hidden">
      <div className="p-5 border-b border-gray-100 font-medium text-gray-500 tracking-wide">
        Settings
      </div>
      <div className="p-3 space-y-2">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-4 hover:bg-red-50 text-red-500 font-medium rounded-lg transition-colors"
        >
          <LogOut size={20} />
          Log out
        </button>
      </div>
    </GlassCard>
  );
}
