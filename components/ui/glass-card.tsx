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
      className={`bg-white border border-gray-100 rounded-lg shadow-card p-6 ${onClick ? 'cursor-pointer' : ''} ${hoverEffect ? 'hover:shadow-elevated hover:border-gray-200 transition-all duration-200' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
