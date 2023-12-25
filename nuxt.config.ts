const path = require('path')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  app: {
    head: {
      link: [{
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png?v=0.1.0'
      }, {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png?v=0.1.0'
      }, {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/android-chrome-192x192.png?v=0.1.0'
      }, {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png?v=0.1.0'
      }, {
        rel: 'manifest',
        href: '/site.webmanifest?v=0.1.0'
      }, {
        rel: 'mask-icon',
        color: '#ffffff',
        href: '/safari-pinned-tab.svg?v=0.2.0'
      }, {
        rel: 'shortcut icon',
        href: '/favicon.ico?v=0.1.0'
      }],
      meta: [{
        name: 'apple-mobile-web-app-title',
        content: "The People's Country"
      }, {
        name: 'application-name',
        content: "The People's Country"
      }, {
        name: 'msapplication-TileColor',
        content: "#ffffff"
      }, {
        name: 'msapplication-TileImage',
        content: "/mstile-144x144.png?v=0.1.0"
      }, {
        name: 'theme-color',
        content: "#ffffff"
      }]
    },

    // https://alex-alekseichuk.github.io/2020/06/10/nojekyll-file-to-host-nuxt-on-github/
    // https://stackoverflow.com/questions/71951915/nuxt3-nuxt-directory-not-found-404-on-github-pages
    buildAssetsDir: 'assets'
  },
  
  // https://nuxt.com/docs/getting-started/deployment#static-hosting
  // https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#about-publishing-sources
  // https://stackoverflow.com/questions/75794580/nuxt-3-nuxt-generate-change-static-output-directory
  nitro: {
    minify: true,
    static: true,
    output: {
      publicDir: path.join(__dirname, 'docs')
    }
  },

  // https://nuxt.com/modules/tailwindcss
  modules: [
    '@nuxtjs/tailwindcss'
  ],

  experimental: {
    // https://github.com/nuxt/nuxt/issues/22068#issuecomment-1629076435
    payloadExtraction: false
  }
})
