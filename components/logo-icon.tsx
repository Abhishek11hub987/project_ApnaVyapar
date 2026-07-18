import React from 'react';
import Image from 'next/image';

export default function LogoIcon({ className = '', size = 32 }: { className?: string; size?: number }) {
  return (
    <Image 
      src="/logo.png" 
      alt="Apna Vyapar Logo" 
      width={size} 
      height={size} 
      className={`rounded-md shadow-sm ${className}`}
    />
  );
}
