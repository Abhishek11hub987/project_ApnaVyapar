import React from 'react';
import LogoIcon from './logo-icon';

interface LogoProps {
  className?: string;
  iconSize?: number;
  showTagline?: boolean;
}

export default function Logo({ className = '', iconSize = 40, showTagline = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src="/logo-transparent.png" 
        alt="Apna Vyapar Logo" 
        style={{ height: iconSize, width: iconSize }} 
        className="object-contain"
      />
      <div className="flex flex-col">
        <span className="font-extrabold tracking-tight" style={{ fontSize: iconSize * 0.7, lineHeight: 1.1 }}>
          <span style={{ color: '#429095' }}>Apna</span> <span style={{ color: '#F19D2A' }}>Vyapar</span>
        </span>
        {showTagline && (
          <span className="text-slate-400 font-medium" style={{ fontSize: iconSize * 0.35, marginTop: 0 }}>
            Aapka Digital Business Sathi
          </span>
        )}
      </div>
    </div>
  );
}
