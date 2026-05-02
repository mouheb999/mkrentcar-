import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#D4AF37",
          light: "#E0C355",
          dark: "#C9A646",
        },
        cream: {
          DEFAULT: "#F5F5F5",
          light: "#FFFFFF",
          dark: "#E0E0E0",
        },
        muted: "#A1A1A1",
        navy: {
          950: "#0A0A0A",
          900: "#111111",
          850: "#161616",
          800: "#1A1A1A",
          700: "#222222",
          600: "#2A2A2A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 20px rgba(0, 0, 0, 0.4)",
        lifted: "0 20px 60px rgba(0, 0, 0, 0.6)",
        glow: "0 0 40px rgba(212, 175, 55, 0.3)",
        "glow-sm": "0 0 20px rgba(212, 175, 55, 0.2)",
        "gold-subtle": "0 0 30px rgba(212, 175, 55, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
