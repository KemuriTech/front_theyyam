/** @type {import('tailwindcss').Config} */
const pickerColors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        customPink: '#ff80b5',
        customPurple: '#9089fc',
        primary: '#dc2626', // red-600
        secondary: '#eab308', // yellow-500
        'vtd-primary': pickerColors.yellow, // Light mode Datepicker color
        'vtd-secondary': pickerColors.gray, // Dark mode Datepicker color
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
  ],
}
