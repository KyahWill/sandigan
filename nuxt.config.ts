// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css:['~/assets/styles/main.css'],
  modules: [
   '@nuxtjs/supabase'
  ],
  buildModules: [
  '@nuxtjs/google-fonts',
  ],
  googleFonts:{
    dowload: true,
    base64: true,
    families: {
      Roboto: true,
      Inter: true,   
    }
  }
})
