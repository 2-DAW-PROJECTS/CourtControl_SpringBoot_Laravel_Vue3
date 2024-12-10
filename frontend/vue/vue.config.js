module.exports = {
  transpileDependencies: true,
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 8081,
    watchFiles: {
      paths: ['src/**/*', 'public/**/*'],
      options: {
        usePolling: true,
      },
    },
  },
}