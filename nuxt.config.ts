// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
   '@nuxtjs/supabase',
   '@nuxtjs/tailwindcss',
  ],
  buildModules: [
  '@nuxtjs/google-fonts',
  ],
  googleFonts:{
    families: {
      Inter: [700],   
    }
  },
  css: [
    '~/assets/styles/main.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
})
