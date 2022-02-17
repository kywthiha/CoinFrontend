module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins"],
    },
    colors: {
      primary: "#181d23",
      "primary-body": "#2e2c40",
      "primary-dark": "#232a32",
      "primary-light": "#2d2b40",
      secondary: "#534d82",
      "secondary-dark": "#8d83e0",
      "secondary-light": "#9488f0",
      white: "white",
      black: "black",
      yellow: "#f7c942",
      red: "#f44336",
      success:"#28a745",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
