const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d20606",
        secondary: "#da0037",
        dark: "#000000",
        "secondary-dark": "#363636",
        white: "#fff",
      },
      fontFamily: {
        primary: ["var(--roboto-font)", ...fontFamily.sans],
        serif: ["var(--roboto-font)", ...fontFamily.serif],
      },
    },
  },
  plugins: [],
};
