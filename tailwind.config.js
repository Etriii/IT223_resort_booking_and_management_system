/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        caladea: ['Caladea', 'serif'],
        cantarell: ['Cantarell', 'sans-serif'],
        allerta: ['"Allerta Stencil"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
