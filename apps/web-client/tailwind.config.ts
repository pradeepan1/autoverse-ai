import type { Config } from "tailwindcss";

/**
 * AutoVerse AI — Tailwind CSS Design Token Configuration
 *
 * All tokens defined here follow docs/UI_UX_Guidelines.md Section 6.
 * No values are hardcoded in components — all styling consumes these tokens.
 * Per docs/PROJECT_RULES.md Rule 20.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // ── Colors ─────────────────────────────────────────────────────────────
      colors: {
        // Background hierarchy
        "bg-primary": {
          DEFAULT: "#FFFFFF",
          dark: "#0A0A0B",
        },
        "bg-secondary": {
          DEFAULT: "#F5F5F7",
          dark: "#161618",
        },
        "bg-elevated": {
          DEFAULT: "#FFFFFF",
          dark: "#1E1E21",
        },
        // Border
        "border-subtle": {
          DEFAULT: "#E4E4E7",
          dark: "#2C2C30",
        },
        // Text hierarchy
        "text-primary": {
          DEFAULT: "#0A0A0B",
          dark: "#F5F5F7",
        },
        "text-secondary": {
          DEFAULT: "#6B6B70",
          dark: "#A1A1A6",
        },
        "text-muted": {
          DEFAULT: "#9C9CA1",
          dark: "#6B6B70",
        },
        // Accent — Porsche red-inspired. Use sparingly.
        accent: {
          DEFAULT: "#D4001A",
          hover: "#B00016",
          dark: "#FF3B45",
          "dark-hover": "#E62F38",
        },
        // Status colors
        success: {
          DEFAULT: "#1E8E5A",
          dark: "#2FBE7C",
          bg: "#F0FDF4",
          "bg-dark": "#052E16",
        },
        warning: {
          DEFAULT: "#B7791F",
          dark: "#E0A83A",
          bg: "#FFFBEB",
          "bg-dark": "#2D1F03",
        },
        error: {
          DEFAULT: "#C0362C",
          dark: "#F0564A",
          bg: "#FEF2F2",
          "bg-dark": "#2D0A0A",
        },
        info: {
          DEFAULT: "#2563EB",
          dark: "#5B8DEF",
          bg: "#EFF6FF",
          "bg-dark": "#0A1628",
        },
      },

      // ── Typography ──────────────────────────────────────────────────────────
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter Tight", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        // Display — hero headlines
        display: ["56px", { lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.02em" }],
        // Heading scale
        h1: ["40px", { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.02em" }],
        h2: ["32px", { lineHeight: "1.15", fontWeight: "600", letterSpacing: "-0.01em" }],
        h3: ["24px", { lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.01em" }],
        h4: ["20px", { lineHeight: "1.25", fontWeight: "600" }],
        // Body scale
        "body-lg": ["18px", { lineHeight: "1.5", fontWeight: "400" }],
        body: ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.45", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "1.4", fontWeight: "500" }],
        // Price display — tabular figures
        price: ["40px", { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.02em" }],
        "price-sm": ["32px", { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.02em" }],
      },

      // ── Border Radius ───────────────────────────────────────────────────────
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },

      // ── Box Shadows ─────────────────────────────────────────────────────────
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.06)",
        md: "0 4px 12px rgba(0,0,0,0.08)",
        lg: "0 12px 32px rgba(0,0,0,0.12)",
        xl: "0 24px 48px rgba(0,0,0,0.16)",
        glass: "0 8px 32px rgba(0,0,0,0.10)",
        // Dark mode variants
        "sm-dark": "0 1px 2px rgba(0,0,0,0.20)",
        "md-dark": "0 4px 12px rgba(0,0,0,0.30)",
        "lg-dark": "0 12px 32px rgba(0,0,0,0.40)",
      },

      // ── Spacing — 8px base unit ─────────────────────────────────────────────
      spacing: {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "7": "28px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "14": "56px",
        "16": "64px",
        "20": "80px",
        "24": "96px",
        "32": "128px",
        // Layout-specific
        "sidebar": "240px",
        "navbar": "64px",
      },

      // ── Max Width ───────────────────────────────────────────────────────────
      maxWidth: {
        content: "1280px",
        prose: "70ch",
      },

      // ── Animation & Transition ──────────────────────────────────────────────
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.4, 0, 0.2, 1)",
        emphasized: "cubic-bezier(0.2, 0, 0, 1)",
        decelerate: "cubic-bezier(0.0, 0, 0.2, 1)",
      },
      keyframes: {
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "toast-slide-in": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fade-in 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-up": "fade-up 400ms cubic-bezier(0.2, 0, 0, 1)",
        "slide-in-right": "slide-in-right 400ms cubic-bezier(0.2, 0, 0, 1)",
        "slide-in-left": "slide-in-left 400ms cubic-bezier(0.2, 0, 0, 1)",
        "scale-in": "scale-in 250ms cubic-bezier(0.2, 0, 0, 1)",
        "toast-slide-in": "toast-slide-in 250ms cubic-bezier(0.2, 0, 0, 1)",
      },

      // ── Backdrop Blur ───────────────────────────────────────────────────────
      backdropBlur: {
        glass: "20px",
      },

      // ── Grid ────────────────────────────────────────────────────────────────
      gridTemplateColumns: {
        "12": "repeat(12, minmax(0, 1fr))",
        "auto-fill-card": "repeat(auto-fill, minmax(280px, 1fr))",
        "auto-fill-card-lg": "repeat(auto-fill, minmax(320px, 1fr))",
      },
    },
  },
  plugins: [],
};

export default config;
