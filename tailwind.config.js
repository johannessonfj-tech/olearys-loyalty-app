/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          primary: '#2d9b87',
          dark: '#23695a',
          light: '#96beaf',
        },
        brand: {
          black: '#3c3c3c',
          yellow: '#ffdc1e',
        },
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
