/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#bc2a68',
        secondary: '#313d4e',
        light: '#d3d7d8',
        dark: '#546c84',
        medium: '#a0a8ab',
        muted: '#5c7484',
        accent: '#a0a19b',
        background: '#788289',
        font: '#313d4e',
        neutral: '#696c6c',
      },
    },
  },
  plugins: [],
};
