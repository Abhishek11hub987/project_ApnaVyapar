import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        hindi: ['var(--font-hind)', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#0B1120',
          light: '#0F1729',
          dark: '#070B14',
        },
        cyan: {
          DEFAULT: '#00D4FF',
          dark: '#0099CC',
        },
        gold: '#FFD700',
        teal: {
          50: '#F0FDFA',
          400: '#2DD4BF',
          500: '#14B8A6',
          700: '#0F766E',
        },
        amber: {
          400: '#FBBF24',
          500: '#F59E0B',
        },
        darkBg: '#070B14',
      },
      boxShadow: {
        'neon-teal': '0 0 10px rgba(45, 212, 191, 0.5), 0 0 20px rgba(45, 212, 191, 0.3)',
        'neon-amber': '0 0 10px rgba(251, 191, 36, 0.5), 0 0 20px rgba(251, 191, 36, 0.3)',
        'neon-cyan': '0 0 40px rgba(0, 212, 255, 0.25), 0 4px 20px rgba(0, 0, 0, 0.3)',
        'glass-light': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glass-dark': '0 4px 30px rgba(15, 118, 110, 0.2)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'draw-line': 'draw-line 1.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(0, 212, 255, 0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(0, 212, 255, 0.2)' },
        },
        'draw-line': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
