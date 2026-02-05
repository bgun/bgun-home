/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f5f7fa',
          100: '#eaeef4',
          200: '#d0dae7',
          300: '#a7bad1',
          400: '#7895b7',
          500: '#57769d',
          600: '#445e82',
          700: '#374c6a',
          800: '#304159',
          900: '#2c384c',
        },
      },
    },
  },
  plugins: [],
}
