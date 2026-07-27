import React from 'react';

export default function LogoIcon({ className = '', size = 32 }: { className?: string; size?: number }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-gray-900 text-white font-bold select-none ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      AV
    </div>
  );
}
