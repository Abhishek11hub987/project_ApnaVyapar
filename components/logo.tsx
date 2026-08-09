import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  iconSize?: number;
  showTagline?: boolean; // Ignored as the new logo has the tagline baked in
}

export default function Logo({ className = '', iconSize = 40 }: LogoProps) {
  // Since the image has the full text, we scale it based on the iconSize, making it wider.
  // The aspect ratio of the provided logo is roughly 3:2 or 4:3. Let's give it a dynamic width.
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className="relative mix-blend-multiply" 
        style={{ height: iconSize * 1.5, width: iconSize * 2.2 }}
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
