/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        mono: ["Fira Code", "monospace"],
        // sans: ["Poppins", "sans-serif"],
        // sans: ["Inter", "sans-serif"],
      },
      colors: {
        // primary: "#A41312",
        primary: "#DB202C",
        font: "#141414",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
