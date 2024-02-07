/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        sideBarBg: "#eaebe4",
        primaryBg: "#eaebe4",
        activeSideBar: "#e3e0ca",
        OrangePrimary: "#f2785c",
      },
      textColor: {
        OrangePrimary: "#f2785c",
        textSecondary: "#353535",
      },
      borderColor: {
        sideBarBorder: "#0a1228",
      },
    },
  },
  plugins: [],
};
