import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1152px",
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: "#08080A",
          elevated: "#111113",
          overlay: "#18181B",
        },
        border: {
          DEFAULT: "#26262A",
          hover: "#3A3A3F",
        },
        text: {
          primary: "#F5F5F4",
          secondary: "#A3A3A1",
          tertiary: "#737371",
        },
        accent: {
          DEFAULT: "#6366F1",
          hover: "#818CF8",
          muted: "#4338CA",
        },
        success: "#22C55E",
        warning: "#EAB308",
        danger: "#EF4444",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.1rem", letterSpacing: "0" }],
        sm: ["0.875rem", { lineHeight: "1.3rem", letterSpacing: "0" }],
        base: ["1rem", { lineHeight: "1.55rem", letterSpacing: "0" }],
        lg: ["1.125rem", { lineHeight: "1.7rem", letterSpacing: "-0.01em" }],
        xl: ["1.375rem", { lineHeight: "1.9rem", letterSpacing: "-0.01em" }],
        "2xl": ["1.75rem", { lineHeight: "2.2rem", letterSpacing: "-0.02em" }],
        "3xl": ["2.25rem", { lineHeight: "2.7rem", letterSpacing: "-0.02em" }],
        "4xl": ["3rem", { lineHeight: "3.4rem", letterSpacing: "-0.03em" }],
        "5xl": ["3.75rem", { lineHeight: "4.1rem", letterSpacing: "-0.03em" }],
        "6xl": ["4.5rem", { lineHeight: "4.8rem", letterSpacing: "-0.04em" }],
      },
      spacing: {
        "0.5": "0.125rem",
        "1.5": "0.375rem",
        "2.5": "0.625rem",
        "3.5": "0.875rem",
        "13": "3.25rem",
        "15": "3.75rem",
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        section: "7rem",
        "section-sm": "4rem",
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.625rem",
        lg: "0.875rem",
        xl: "1.25rem",
        "2xl": "1.75rem",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.20)",
        DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.30), 0 1px 2px -1px rgb(0 0 0 / 0.30)",
        md: "0 4px 8px -2px rgb(0 0 0 / 0.35), 0 2px 4px -2px rgb(0 0 0 / 0.30)",
        lg: "0 12px 24px -4px rgb(0 0 0 / 0.40), 0 4px 8px -4px rgb(0 0 0 / 0.30)",
        xl: "0 24px 48px -8px rgb(0 0 0 / 0.45), 0 8px 16px -8px rgb(0 0 0 / 0.35)",
        glow: "0 0 0 1px rgb(99 102 241 / 0.30), 0 0 24px 0 rgb(99 102 241 / 0.20)",
        none: "none",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;