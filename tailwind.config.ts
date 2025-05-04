import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"], // Enable dark mode based on class
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "", // Optionally, you can add a prefix to all classes (e.g., 'tw-')
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px", // Set custom container size for 2xl screens
      },
    },
    extend: {
      colors: {
        // Custom colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Amman Electricals custom colors
        electric: {
          blue: {
            DEFAULT: "#1E40AF", // Main blue color
            light: "#3B82F6", // Lighter blue
            dark: "#1E3A8A", // Darker blue
          },
          yellow: {
            DEFAULT: "#FBBF24", // Main yellow color
            light: "#FDE68A", // Lighter yellow
            dark: "#D97706", // Darker yellow
          },
          gray: {
            DEFAULT: "#6B7280", // Main gray color
            light: "#F3F4F6", // Light gray
            dark: "#1F2937", // Dark gray
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)", // Custom large radius
        md: "calc(var(--radius) - 2px)", // Custom medium radius
        sm: "calc(var(--radius) - 4px)", // Custom small radius
      },
      keyframes: {
        // Keyframes for custom animations
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)" },
        },
        "rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spark": {
          "0%": { filter: "brightness(100%)" },
          "50%": { filter: "brightness(150%)" },
          "100%": { filter: "brightness(100%)" },
        },
      },
      animation: {
        // Animation utilities
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-out": "scale-out 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "rotate": "rotate 8s linear infinite",
        "spark": "spark 2s ease-in-out infinite",
        "enter": "fade-in 0.3s ease-out, scale-in 0.2s ease-out",
        "exit": "fade-out 0.3s ease-out, scale-out 0.2s ease-out",
      },
    },
  },
  plugins: [import("tailwindcss-animate")], // For smooth animations
  safelist: [
    {
      pattern: /animate-(fade-in|fade-out|float|glow|rotate|spark)/,
    },
    {
      pattern: /bg-electric-(blue|yellow|gray)/,
      variants: ["hover", "active", "dark"],
    },
  ], // Safelist for dynamic class names
};
