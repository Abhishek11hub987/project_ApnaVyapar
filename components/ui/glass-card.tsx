'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className = '', onClick, hoverEffect = true }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-gray-100 rounded-2xl shadow-card p-6 ${onClick ? 'cursor-pointer' : ''} ${hoverEffect ? 'hover:shadow-elevated hover:border-accent-200/60 hover:-translate-y-0.5 transition-all duration-300' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
