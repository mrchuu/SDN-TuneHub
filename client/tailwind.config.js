/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark30: "#172A46",
        dark10: "#DA8F66",
        dark60: "#08172B",
        light30: "#E3E0CA",
        light10: "#F2785C",
        light60: "#EAEBE4",
        lightText: "#353535",
        darkText: "#FFFFFF",
        darkTextSecondary: "#ADADAD",
        lightTextSecondary: "#717171"
      }
    },
  },
  
  plugins: [],
};
