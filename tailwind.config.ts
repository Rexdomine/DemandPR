import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "var(--navy)",
        atlantic: "var(--navy-soft)",
        teal: "var(--teal)",
        "teal-deep": "var(--teal-deep)",
        gold: "var(--gold)",
        ivory: "var(--ivory)",
        porcelain: "var(--porcelain)",
        graphite: "var(--graphite)",
      },
      fontFamily: {
        body: ["var(--font-body)"],
        heading: ["var(--font-heading)"],
      },
    },
  },
  plugins: [],
};

export default config;
