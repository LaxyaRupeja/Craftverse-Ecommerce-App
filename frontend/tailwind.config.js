/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'Rubik': ['Rubik']
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require("tw-elements/dist/plugin.cjs")
  ],
}