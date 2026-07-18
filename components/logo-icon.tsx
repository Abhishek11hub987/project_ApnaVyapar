import React from 'react';

export default function LogoIcon({ className = '', size = 32 }: { className?: string; size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F766E" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      
      {/* Background shape */}
      <rect width="40" height="40" rx="12" fill="url(#logo-gradient)" fillOpacity="0.1" />
      
      {/* Storefront roof */}
      <path d="M8 16L20 8L32 16" stroke="url(#logo-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Pillars */}
      <path d="M12 16V28M28 16V28" stroke="url(#logo-gradient)" strokeWidth="3" strokeLinecap="round" />
      
      {/* Base */}
      <path d="M8 28H32" stroke="url(#logo-gradient)" strokeWidth="3" strokeLinecap="round" />
      
      {/* Growth Arrow (shooting up out of the roof) */}
      <path d="M22 18L28 12M28 12H23M28 12V17" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
