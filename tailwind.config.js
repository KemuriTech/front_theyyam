/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        customPink: '#ff80b5',
        customPurple: '#9089fc',
        primary: '#dc2626', // red-600
        secondary: '#eab308', // yellow-500
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
