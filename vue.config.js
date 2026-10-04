const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/BookList-SPA/'
    : '/',
  outputDir: 'docs',
  devServer: {
    port: 8080,
    historyApiFallback: true
  }
})
