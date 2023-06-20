'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.GeoAbstract = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
const ref_1 = require('../functions/ref')
const Geo_1 = require('./Geo')
/**
 * Abstract class for working with location
 *
 * Абстрактный класс для работы с локацией
 */
class GeoAbstract {
  data
  /**
     * Current language
     *
     * Текущий язык
     */
  lang = (0, vue_1.computed)(() => this.data.value?.language || 'en')
  /**
     * Current country
     *
     * Текущая страна
     */
  country = (0, vue_1.computed)(() => this.data.value?.country || 'GB')
  /**
     * Full format
     *
     * Полный формат
     */
  code = (0, vue_1.computed)(() => `${this.lang.value}-${this.country.value}`)
  /**
     * Full format according to the standard
     *
     * Полный формат согласно стандарту
     */
  codeStandard = (0, vue_1.computed)(() => {
    const lang = Geo_1.Geo.getDataByLanguage(this.lang.value)
    return `${lang?.language || this.lang.value}-${this.country.value}`
  })

  /**
     * First day of the week
     *
     * Первый день недели
     */
  firstDay = (0, vue_1.computed)(() => this.data.value?.firstDay || 'Mo')
  /**
     * Constructor
     * @param code string in the form of language-country / строка в виде язык-страна
     */
  constructor (code) {
    const value = (0, vue_1.computed)(() => (0, ref_1.getRef)(code) || Geo_1.Geo.code.value || 'en-GB')
    this.data = (0, vue_1.computed)(() => {
      const data = Geo_1.Geo.findData(value.value) || Geo_1.Geo.data.value
      const language = Geo_1.Geo.toLanguage(value.value)
      if (data) {
        return {
          ...data,
          language: (0, data_1.isFilled)(language) ? language : data?.language
        }
      } else {
        return undefined
      }
    })
  }
}
exports.GeoAbstract = GeoAbstract
// # sourceMappingURL=GeoAbstract.js.map
