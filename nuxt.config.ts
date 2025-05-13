export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['@/assets/css/tailwind.css','@vueform/slider/themes/default.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001',
    },
  }
})
