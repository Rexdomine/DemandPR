import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        burgundy: "var(--brand-primary)",
        "burgundy-deep": "var(--brand-primary-deep)",
        champagne: "var(--brand-accent)",
        canvas: "var(--surface-canvas)",
        raised: "var(--surface-raised)",
        subtle: "var(--surface-subtle)",
        "accent-soft": "var(--surface-accent-soft)",
        "text-strong": "var(--text-strong)",
        "text-body": "var(--text-body)",
        "text-muted": "var(--text-muted)",
      },
    },
  },
  plugins: [],
};

export default config;
