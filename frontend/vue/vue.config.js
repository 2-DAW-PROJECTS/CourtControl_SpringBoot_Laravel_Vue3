const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    hot: true,
    host: '0.0.0.0',
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    }
  }
})