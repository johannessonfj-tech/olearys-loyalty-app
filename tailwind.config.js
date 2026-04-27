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
          gray: {
            100: '#f5f5f5',
            200: '#ebebeb',
            300: '#e0e0e0',
            400: '#c4c4c4',
            500: '#9e9e9e',
            700: '#5a5a5a',
          },
        },
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
}
