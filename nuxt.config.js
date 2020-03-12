export default {
  server: {
    port: 3333
  },
  buildModules: ['@nuxtjs/vuetify'],
  builds: [
    {
      src: 'nuxt.config.js',
      use: '@nuxtjs/now-builder',
      config: {
        serverFiles: ['api/**']
      }
    }
  ],
  serverMiddleware: [
    {
      path: '/api/palette-picker',
      handler: '../api/palette-picker.js'
    }
  ]
}
