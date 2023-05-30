const { defineConfig } = require('@vue/cli-service')
const Properties = require('./classes/services/Properties')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: (new Properties(['md2'])).getScss()
      }
    }
  }
})
