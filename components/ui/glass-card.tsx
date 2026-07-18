'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className = '', onClick, hoverEffect = true }: GlassCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverEffect ? { y: -5, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`glass-panel p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
