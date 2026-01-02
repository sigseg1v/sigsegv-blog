/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './themes/sigsegv-minimal/layouts/**/*.html',
    './content/**/*.md',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
