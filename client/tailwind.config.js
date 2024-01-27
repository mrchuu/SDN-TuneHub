/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        sideBarBg: "#0a1228",
        primaryBg: "#151D30",
        activeSideBar: "#1c2a4d",
        PinkPrimary: "#E57F94",
      },
      textColor: {
        PinkPrimary: "#E57F94",
        textSecondary: "#A5A5A5",
      },
      borderColor: {
        sideBarBorder: "#0a1228",
      },
    },
  },
  plugins: [],
};
