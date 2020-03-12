const moduleAlias = require('module-alias')
moduleAlias.addAliases({
  '@': __dirname + '/../'
})
export default {
  server: {
    port: 3333
  },
  buildModules: ['@nuxtjs/vuetify'],
  serverMiddleware: [
    {
      path: 'api/palette-picker',
      handler: '@/api/palette-picker.js'
    }
  ]
}
