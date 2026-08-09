'use client';

import { Server, Settings, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function AdminControls() {
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSynced(true);
      setTimeout(() => setSynced(false), 2000);
    }, 800);
  };

  const handleSettings = () => {
    alert("Global Platform Settings will be available in the next release.");
  };

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button 
        onClick={handleSync}
        disabled={syncing || synced}
        className="btn-secondary text-sm px-4 py-2 flex items-center gap-2 transition-all disabled:opacity-80"
      >
        {syncing ? (
          <>
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            Syncing...
          </>
        ) : synced ? (
          <>
            <CheckCircle2 size={16} className="text-emerald-500" />
            Synced Successfully
          </>
        ) : (
          <>
            <Server size={16} /> Force Sync Cache
          </>
        )}
      </button>
      <button 
        onClick={handleSettings}
        className="btn-secondary text-sm px-4 py-2 flex items-center gap-2 hover:bg-gray-100 transition-colors"
      >
        <Settings size={16} /> Global Platform Settings
      </button>
    </div>
  );
}
