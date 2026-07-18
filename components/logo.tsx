import React from 'react';
import LogoIcon from './logo-icon';

interface LogoProps {
  className?: string;
  iconSize?: number;
  showTagline?: boolean;
}

export default function Logo({ className = '', iconSize = 40, showTagline = false }: LogoProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-3">
        <LogoIcon size={iconSize} />
        <div className="flex flex-col">
          <span className="font-bold tracking-tight text-slate-900 dark:text-white" style={{ fontSize: iconSize * 0.6 }}>
            Apna <span className="text-teal-600 dark:text-teal-400">Vyapar</span>
          </span>
          {showTagline && (
            <span className="text-slate-500 dark:text-slate-400 font-medium" style={{ fontSize: iconSize * 0.3, marginTop: -4 }}>
              अपना व्यापार, अपनी पहचान
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
