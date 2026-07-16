import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          700: "#0F766E",
          500: "#14B8A6",
        },
        amber: {
          500: "#F59E0B",
        },
        background: "#F8FAFC",
      },
    },
  },
  plugins: [],
};
export default config;
