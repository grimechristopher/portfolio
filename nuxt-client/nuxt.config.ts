// https://nuxt.com/docs/api/configuration/nuxt-config
const strapiBaseUri = process.env.API_URL || "http://192.168.0.122:1337";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  modules: [
    '@nuxtjs/strapi',
    "@nuxtjs/google-fonts",
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
}
})
