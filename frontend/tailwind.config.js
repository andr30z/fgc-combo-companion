const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      height: {
        '10vh': '10vh',
        '80vh': '80vh',
      },
      minHeight: {
        '80vh': '80vh',
        400: '400px',
      },
      colors: {
        primary: { DEFAULT: '#d20606', darker: '#a80404' },
        secondary: '#da0037',
        dark: '#000000',
        'secondary-dark': '#121212',
        'sub-info': '#c3c3c3c3',
        light: {
          DEFAULT: '#fff',
          darker: '#f2f2f2',
          active: 'rgba(255, 255, 255, 0.3)',
        },
      },
      fontFamily: {
        primary: ['var(--roboto-font)', ...fontFamily.sans],
        serif: ['var(--roboto-font)', ...fontFamily.serif],
      },
    },
  },
  plugins: [],
};
