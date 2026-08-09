import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  iconSize?: number; // Kept for backwards compatibility but we will use responsive classes
  showTagline?: boolean; 
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className="relative mix-blend-multiply h-12 w-20 md:h-16 md:w-28 lg:h-20 lg:w-36 transition-all" 
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
