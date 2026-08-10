import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  iconSize?: number; // Kept for backwards compatibility but we will use responsive classes
  showTagline?: boolean; 
}

export default function Logo({ className = '', iconSize }: LogoProps) {
  // If iconSize is provided, we use a fixed size. 
  // We use a wider aspect ratio to accommodate the text in the logo.
  const width = iconSize ? iconSize * 2.8 : undefined;
  const height = iconSize ? iconSize * 1.2 : undefined;
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`relative mix-blend-multiply transition-all ${
          !iconSize ? 'h-14 w-32 md:h-16 md:w-40' : ''
        }`}
        style={iconSize ? { height, width } : undefined}
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
