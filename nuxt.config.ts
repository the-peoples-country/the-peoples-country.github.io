export default defineNuxtConfig({
  modules: ['@nuxt/content'],

  css: ['~/assets/css/main.css'],

  // Node >= 22.5 ships `node:sqlite`, so the build needs no native compile step.
  content: {
    experimental: { sqliteConnector: 'native' },
  },

  // No `app.baseURL`: this is an org Pages repo, so it publishes at the domain root.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/search', '/search-index.json'],
    },
  },
})
