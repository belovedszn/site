import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: {
      ink: { DEFAULT: "#0A0A0A", 900: "#070707", 800: "#171717", 700: "#262626" },
      bone: { DEFAULT: "#FAFAFA", 200: "#F5F5F5" },
      jade: { DEFAULT: "#0FA37F", 400: "#3BC0A1", 600: "#0B8366", 700: "#0A7458", 100: "#DCF1EA" },
      mid: "#737373",
    },
    fontFamily: {
      sans: ["Satoshi", "system-ui", "sans-serif"],
      display: ['"Clash Display"', "Satoshi", "sans-serif"],
      mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
    },
  } },
  plugins: [],
} satisfies Config;
