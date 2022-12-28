// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["~/assets/styles/main.css"],
  app: {
    head: {
      script: [
        {
          src:"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3605390577343754" ,
          async: true,
          crossorigin: "anonymous" 
        }
      ]
    }
  },
});
