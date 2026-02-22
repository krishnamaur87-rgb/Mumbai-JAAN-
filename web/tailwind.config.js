/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './menu.html',
    './dashboard.html',
    './src/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff9f1c',
        dark: '#1a1a1a',
        light: '#ffffff',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
