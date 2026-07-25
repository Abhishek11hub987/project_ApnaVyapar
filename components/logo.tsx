import React from 'react';
import LogoIcon from './logo-icon';

interface LogoProps {
  className?: string;
  iconSize?: number;
  showTagline?: boolean;
}

export default function Logo({ className = '', iconSize = 40, showTagline = false }: LogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/apna-vyapar-logo-final.png" 
        alt="Apna Vyapar Logo" 
        style={{ height: iconSize * 1.5, width: 'auto' }} 
        className="object-contain"
      />
    </div>
  );
}
