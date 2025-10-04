const { CgDarkMode } = require('react-icons/cg');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:"class",
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
