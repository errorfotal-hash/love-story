import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blush: "#ffb6c1",
        champagne: "#f5e1da"
      },
      fontFamily: {
        display: ["var(--font-poppins)"],
        body: ["var(--font-open-sans)"]
      },
      backgroundImage: {
        "romantic-gradient": "linear-gradient(135deg, rgba(255, 182, 193, 0.45), rgba(245, 225, 218, 0.65))"
      }
    }
  },
  plugins: []
};

export default config;
