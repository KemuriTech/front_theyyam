/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        customPink: '#ff80b5',
        customPurple: '#9089fc',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
