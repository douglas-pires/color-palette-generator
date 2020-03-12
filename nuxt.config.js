import path from 'path'
console.log(path.resolve(__dirname + 'api/palette-picker.js'))
export default {
  server: {
    port: 3333
  },
  buildModules: ['@nuxtjs/vuetify'],
  serverMiddleware: [
    {
      path: 'api/palette-picker',
      handler: path.resolve(__dirname + '/api/palette-picker.js')
    }
  ]
}
