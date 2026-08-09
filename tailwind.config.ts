import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        hindi: ['var(--font-hind)', 'sans-serif'],
      },
      colors: {
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#0a2f2d',
        },
        surface: {
          DEFAULT: '#ffffff',
          secondary: '#FAFBFC',
          tertiary: '#F1F5F9',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0,0,0,0.03)',
        'subtle': '0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'card': '0 2px 8px -2px rgba(13,148,136,0.08), 0 1px 3px -1px rgba(0,0,0,0.04)',
        'elevated': '0 8px 24px -4px rgba(13,148,136,0.12), 0 4px 8px -4px rgba(0,0,0,0.04)',
        'modal': '0 20px 40px -8px rgba(13,148,136,0.15), 0 8px 16px -8px rgba(0,0,0,0.06)',
        'nav': '0 1px 3px 0 rgba(0,0,0,0.03), 0 4px 12px -2px rgba(0,0,0,0.04)',
        'glow': '0 0 20px rgba(20,184,166,0.3)',
        'glow-lg': '0 0 40px rgba(20,184,166,0.25), 0 0 80px rgba(20,184,166,0.1)',
        'glow-accent': '0 0 0 1px rgba(20,184,166,0.1), 0 4px 16px rgba(20,184,166,0.12)',
      },
      ringColor: {
        accent: {
          DEFAULT: 'rgba(20,184,166,0.5)',
          light: 'rgba(20,184,166,0.2)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'shimmer-fast': 'shimmer 1.2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
