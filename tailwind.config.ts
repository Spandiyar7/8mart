import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D91572",
        primaryHover: "#B80F5E",
        lightPink: "#FFE4EF",
        deepRose: "#8A123F",
        graphite: "#25262B",
        softGraphite: "#3A3B40",
        warmMilk: "#FFF8F4",
        leafGreen: "#3F6F3A",
        goldBeige: "#D6B98C"
      },
      boxShadow: {
        premium: "0 24px 70px rgba(37, 38, 43, 0.12)",
        soft: "0 16px 45px rgba(37, 38, 43, 0.08)"
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
