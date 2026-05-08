/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
      },
      colors: {
        navy: {
          900: '#0a1628',
          800: '#0f2044',
          700: '#163060',
        },
        brand: {
          500: '#2563c8',
          400: '#3b82f6',
          300: '#60a5fa',
          200: '#93c5fd',
          100: '#dbeafe',
          50:  '#eff6ff',
        }
      }
    },
  },
  plugins: [],
}