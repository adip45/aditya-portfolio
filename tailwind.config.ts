import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0b0d",
          950: "#07080a",
          900: "#0a0b0d",
          850: "#0d0f12",
          800: "#111316",
          700: "#171a1e",
          600: "#1f2328",
        },
        bone: {
          DEFAULT: "#f2efe9",
          dim: "#b9b6b0",
          mute: "#8b8983",
          faint: "#7d7b76",
        },
        signal: {
          DEFAULT: "#4f9dff",
          soft: "#8abbff",
          deep: "#1d6fe0",
        },
        hairline: "rgba(242,239,233,0.09)",
        "hairline-strong": "rgba(242,239,233,0.16)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["var(--text-display)", { lineHeight: "0.88", letterSpacing: "-0.042em" }],
        "display-sm": ["clamp(2.1rem, 5.4vw, 4.1rem)", { lineHeight: "1.0", letterSpacing: "-0.034em" }],
        "section-title": ["var(--text-section)", { lineHeight: "1.02", letterSpacing: "-0.032em" }],
      },
      letterSpacing: {
        label: "0.22em",
      },
      maxWidth: {
        shell: "84rem",
        prose: "38rem",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "scroll-hint": {
          "0%": { transform: "translateY(-100%)" },
          "55%, 100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        marquee: "marquee 38s linear infinite",
        "pulse-soft": "pulse-soft 3.2s ease-in-out infinite",
        "scroll-hint": "scroll-hint 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
