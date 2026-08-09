import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  iconSize?: number; // Kept for backwards compatibility but we will use responsive classes
  showTagline?: boolean; 
}

export default function Logo({ className = '', iconSize }: LogoProps) {
  // If iconSize is provided, we use a fixed size. 
  // We use a 16:9 aspect ratio approximation since the logo is rectangular.
  const width = iconSize ? iconSize * 1.5 : undefined;
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`relative mix-blend-multiply transition-all ${
          !iconSize ? 'h-12 w-20 md:h-16 md:w-28 lg:h-20 lg:w-36' : ''
        }`}
        style={iconSize ? { height: iconSize, width } : undefined}
      >
        <Image
          src="/logo-transparent.png"
          alt="Apna Vyapar Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
