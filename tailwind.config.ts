import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "var(--navy)",
        atlantic: "var(--navy-soft)",
        teal: "var(--teal)",
        gold: "var(--gold)",
        ivory: "var(--ivory)",
        porcelain: "var(--porcelain)",
        graphite: "var(--graphite)",
      },
    },
  },
  plugins: [],
};

export default config;
