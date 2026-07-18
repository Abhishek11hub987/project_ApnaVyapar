import { ReactNode } from 'react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'teal' | 'amber';
  glow?: boolean;
}

export function NeonButton({ children, className = '', variant = 'teal', glow = true, ...props }: NeonButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-full border-2 transition-all duration-300 backdrop-blur-sm overflow-hidden";
  
  const variants = {
    teal: "text-teal-400 border-teal-400 hover:bg-teal-400/10 hover:shadow-neon-teal",
    amber: "text-amber-400 border-amber-400 hover:bg-amber-400/10 hover:shadow-neon-amber",
  };

  const glowClasses = glow 
    ? (variant === 'teal' ? 'neon-text-teal' : 'neon-text-amber')
    : '';

  return (
    <button className={`${baseClasses} ${variants[variant]} ${glowClasses} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
