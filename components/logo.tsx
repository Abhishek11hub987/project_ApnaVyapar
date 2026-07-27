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
        className="flex items-center justify-center rounded-lg bg-gray-900 text-white font-bold select-none"
        style={{ width: iconSize + 8, height: iconSize + 8, fontSize: iconSize * 0.45 }}
      >
        AV
      </div>
      <div className="flex flex-col">
        <span className="font-semibold tracking-tight text-gray-900" style={{ fontSize: iconSize * 0.7, lineHeight: 1.15 }}>
          Apna Vyapar
        </span>
        {showTagline && (
          <span className="text-gray-400 text-xs" style={{ marginTop: -1 }}>
            Aapka Digital Business Sathi
          </span>
        )}
      </div>
    </div>
  );
}
