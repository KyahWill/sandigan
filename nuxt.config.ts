// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['~/assets/styles/main.css'],
  app: {
    head: {
      script: [
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
          'data-ad-client': 'ca-pub-360539057734375',
          async,
        },
        {
          src: 'https://cdn.ampproject.org/v0/amp-ad-0.1.js',
          'data-custom-element': 'amp-ad'
        }
      ]
    }
  }
})
