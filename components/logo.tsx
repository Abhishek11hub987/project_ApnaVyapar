import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  iconSize?: number;
  showTagline?: boolean;
}

export default function Logo({ className = '', iconSize = 28, showTagline = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div 
        className="flex items-center justify-center relative shrink-0 overflow-hidden rounded-xl shadow-glow bg-gradient-to-br from-accent-500 to-accent-700 p-[1px]"
        style={{ width: iconSize + 10, height: iconSize + 10 }}
      >
        <div className="w-full h-full bg-white rounded-[11px] relative flex items-center justify-center overflow-hidden">
          <Image
            src="/logo-transparent.png"
            alt="Apna Vyapar Logo"
            fill
            className="object-contain p-1"
            priority
          />
        </div>
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
