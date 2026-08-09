import React from 'react';
import Image from 'next/image';

export default function LogoIcon({ className = '', size = 32 }: { className?: string; size?: number }) {
  return (
    <div
      className={`flex items-center justify-center relative shrink-0 overflow-hidden rounded-lg shadow-sm bg-gradient-to-br from-accent-500 to-accent-700 p-[1px] ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="w-full h-full bg-white rounded-[7px] relative flex items-center justify-center overflow-hidden">
        <Image
          src="/logo-transparent.png"
          alt="Apna Vyapar Icon"
          fill
          className="object-contain p-[2px]"
          priority
        />
      </div>
    </div>
  );
}
