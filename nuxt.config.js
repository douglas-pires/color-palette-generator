import path from 'path'
export default {
  server: {
    port: 3333
  },
  buildModules: ['@nuxtjs/vuetify'],
  serverMiddleware: [
    {
      path: '/api/palette-picker',
      handler: path.resolve(__dirname, '~/../api/palette-picker.js')
    }
  ]
}
