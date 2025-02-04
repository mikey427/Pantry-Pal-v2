import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d232a",
        primaryLight: "#1f2937",
        accent: "#4f46e6",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
