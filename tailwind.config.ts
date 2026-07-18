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
        hindi: ['var(--font-hind)', 'sans-serif'],
      },
      colors: {
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
        'glass-light': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glass-dark': '0 4px 30px rgba(15, 118, 110, 0.2)',
      }
    },
  },
  plugins: [],
};
export default config;
