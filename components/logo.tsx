import React from 'react';

interface LogoProps {
  className?: string;
  iconSize?: number;
  showTagline?: boolean;
}

export default function Logo({ className = '', iconSize = 28, showTagline = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className="flex items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 text-white font-extrabold select-none shadow-glow"
        style={{ width: iconSize + 10, height: iconSize + 10, fontSize: iconSize * 0.48, letterSpacing: '-0.5px' }}
      >
        AV
      </div>
      <div className="flex flex-col">
        <span className="font-bold tracking-tight text-gray-900" style={{ fontSize: iconSize * 0.72, lineHeight: 1.15, letterSpacing: '-0.3px' }}>
          Apna Vyapar
        </span>
        {showTagline && (
          <span className="text-gray-500 font-medium" style={{ fontSize: iconSize * 0.4, marginTop: 1 }}>
            Aapka Digital Business Sathi
          </span>
        )}
      </div>
    </div>
  );
}
