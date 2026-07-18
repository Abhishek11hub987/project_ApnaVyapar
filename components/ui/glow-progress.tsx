import React from 'react';

interface GlowProgressProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: 'teal' | 'amber';
  children?: React.ReactNode;
}

export function GlowProgress({ progress, size = 120, strokeWidth = 10, color = 'teal', children }: GlowProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  const strokeColor = color === 'teal' ? '#2DD4BF' : '#FBBF24';
  const glowColor = color === 'teal' ? 'rgba(45, 212, 191, 0.5)' : 'rgba(251, 191, 36, 0.5)';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
      >
        <circle
          className="text-slate-700/30"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="transition-all duration-1000 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke={strokeColor}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
