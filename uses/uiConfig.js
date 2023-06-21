const { defineConfig } = require('@vue/cli-service')
const {
  executeFunction,
  isFunction,
  replaceRecursive
} = require('../functions/data')

const Properties = require('../classes/services/Properties')

/**
 * Returns user configuration
 *
 * Возвращает конфигурацию пользователя
 * @param {Object<string,*>|(() => Object<string,*>)} config конфигурацию
 * @return {*}
 */
const getConfig = (config) => {
  return { ...executeFunction(config) }
}

/**
 * Returns the values of the 'additionalData' field for SCSS
 *
 * Возвращает значения поля 'additionalData' для SCS
 * @param {Object<string,*>} config конфигурацию
 * @return {string}
 */
const getScss = (config) => {
  return executeFunction(config?.css?.loaderOptions?.scss?.additionalData) || ''
}

/**
 * Getting structured data for use in an SCSS file
 *
 * Получение структурированных данных для работы в SCSS файле
 * @param {Object<string,*>} config конфигурацию
 * @return {{css: {loaderOptions: {scss: {additionalData: string}}}}}
 */
const getPropertiesScss = (config) => {
  return {
    css: {
      loaderOptions: {
        scss: {
          additionalData: `${(new Properties()).getScss()}\r\n${getScss(config)}`
        }
      }
    }
  }
}

/**
 *
 * @param {Object<string,*>} configUser конфигурацию
 * @return {{chainWebpack: *}}
 */
const getChainWebpack = (configUser) => {
  return {
    chainWebpack: config => {
      if (isFunction(configUser?.chainWebpack)) {
        configUser.chainWebpack(config)
      }

      config.module
        .rule('vue')
        .use('ui-vue-loader')
        .loader('./uses/loaders/ui-vue-loader.js')
    }
  }
}

/**
 * Getting an object for configuration
 *
 * Получение объекта для конфигурации
 * @param {Object<string,*>|(() => Object<string,*>)} config конфигурацию
 */
module.exports = function uiConfig (
  config = {}
) {
  let data = getConfig(config)

  data = replaceRecursive(data, getPropertiesScss(config))
  data = replaceRecursive(data, getChainWebpack(config))
  data = replaceRecursive(data, {
    transpileDependencies: true
  })

  return defineConfig(data)
}
