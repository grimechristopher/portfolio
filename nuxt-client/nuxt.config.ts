// https://nuxt.com/docs/api/configuration/nuxt-config
const strapiBaseUri = process.env.NUXT_API_URL;

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  modules: [
    '@nuxtjs/strapi',
    "@nuxtjs/google-fonts",
    "nuxt-strapi-blocks-renderer",
  ],
  strapi: {   
    url: strapiBaseUri,
    prefix: '/api',  
    version: 'v4',
    cookie: {},
    cookieName: 'strapi_jwt',
  },
  googleFonts: {
    families: {
        'Open Sans': [400, 500, 600, 700],
    },
  },
  devServer: {
    // host: '3000',
    port: 3000 // optional
  },
  runtimeConfig: {
    apiUrl: process.env.NUXT_API_URL,
  },
})
