/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'Rubik': ['Rubik']
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}