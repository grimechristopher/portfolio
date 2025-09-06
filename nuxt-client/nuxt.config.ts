export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', '@nuxtjs/mdc', '@nuxtjs/sitemap'],
  app: {
    head: {
      link: [
        // Favicon and icons
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        // Web app manifest
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      meta: [
        { name: 'theme-color', content: '#ffffff' },
        { name: 'msapplication-TileColor', content: '#ffffff' }
      ]
    }
  },
  mdc: {
    components: {
      prose: true, // Enable default prose components
      map: {}
    },
    highlight: {
      theme: 'github-light'
    }
  },
  pages: true,
  css: ['~/assets/css/main.css'],
  devServer: {
    https: true
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'https://localhost:3000',
      strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
    }
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/*'],
      cookieRedirect: false,
      saveRedirectToCookie: false
    }
  }
})