export default {
  server: {
    port: 3333
  },
  buildModules: ['@nuxtjs/vuetify'],
  serverMiddleware: [
    {
      path: '/api/palette-picker',
      handler: console.log(__dirname)
    }
  ]
}
