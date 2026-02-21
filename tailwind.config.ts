import type { Config } from "tailwindcss";

const config: Config = {
  // Directing Tailwind to scan all files in the root app and components folders
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 🎨 CUSTOM COLOR PALETTE: Vibrant EV Branding
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
        emerald: {
          400: "#34d399",
          500: "#10b981",
        },
        slate: {
          950: "#020617", // Deep Midnight
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
      // ✨ ANIMATIONS: For smooth transitions and glowing pulses
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      // 🧊 GLASSMORPHISM UTILITIES
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern": "url('/grid.svg')", // Optional: if you add a grid SVG to public/
      },
    },
  },
  plugins: [],
};

export default config;