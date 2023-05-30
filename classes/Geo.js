'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Geo = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
const Env_1 = require('./Env')
const StorageItem_1 = require('./StorageItem')
const geo = require('../constructors/geo.json')
/**
 * Base class for working with geographic data
 *
 * Базовый класс для работы с географическими данными
 */
class Geo {
  static storage
  static focusLanguage = (0, vue_1.ref)('en')
  /**
     * Information about the current country
     *
     * Информация об текущей стране
     */
  static data = (0, vue_1.ref)()
  /**
     * Current language
     *
     * Текущий язык
     */
  static lang = (0, vue_1.computed)(() => this.focusLanguage.value || this.data.value?.language || this.findLanguage() || 'en')
  /**
     * Current country
     *
     * Текущая страна
     */
  static country = (0, vue_1.computed)(() => this.data.value?.country || this.findCountry() || 'GB')
  /**
     * Full format
     *
     * Полный формат
     */
  static code = (0, vue_1.computed)(() => `${this.lang.value}-${this.country.value}`)
  /**
     * First day of the week
     *
     * Первый день недели
     */
  static firstDay = (0, vue_1.computed)(() => this.data.value?.firstDay || 'Mo')
  /**
     * Determines the current location
     *
     * Определяет текущую локацию
     */
  static findLocation () {
    return this.storage.get().value ||
            document.querySelector('html')?.lang ||
            navigator.language ||
            navigator.languages[0] ||
            Env_1.Env.language() ||
            'en-GB'
  }

  /**
     * Determines the current language
     *
     * Определяет текущий язык
     */
  static findLanguage () {
    return this.toLanguage(this.findLocation())
  }

  /**
     * Determines the current country
     *
     * Определяет текущую страну
     */
  static findCountry () {
    return this.toCountry(this.findLocation())
  }

  /**
     * Determines the current country by its full name
     *
     * Определяет текущую страну по ее полному названию
     * @param code country code, full form language-country or one of them / код
     * страны, полный вид язык-страна или один из них
     */
  static findData (code) {
    if (code) {
      return this.getDataByCode(code) || this.getDataByCountry(this.toCountry(code))
    } else {
      return this.data.value
    }
  }

  /**
     * Returns the full list of countries
     *
     * Возвращает полный список стран
     */
  static getBase () {
    return geo
  }

  /**
     * Returns the full data by language and country
     *
     * Возвращает полные данные по языку и стране
     * @param code string in the form of language-country / строка в виде язык-страна
     */
  static getData (code) {
    return geo?.find(item => `${item?.language}-${item?.country}` === code)
  }

  /**
     * Returns the full data by language
     *
     * Возвращает полные данные по языку
     * @param language language / язык
     */
  static getDataByLanguage (language) {
    return geo?.find(item => {
      return item?.language === language ||
                item?.languageAlternative?.find(languageAlternative => languageAlternative === language)
    })
  }

  /**
     * Returns the full data by country
     *
     * Возвращает полные данные по стране
     * @param country country / страна
     */
  static getDataByCountry (country) {
    return geo?.find(item => {
      return item?.country === country ||
                item?.countryAlternative?.find(countryAlternative => countryAlternative === country)
    })
  }

  /**
     * Returns the data about the country by its full code
     *
     * Возвращает данные о стране по ее полному коду
     * @param code country code, full form language-country or one of them / код
     * страны, полный вид язык-страна или один из них
     */
  static getDataByCode (code) {
    let data
    if (code) {
      if (code.match(/-/)) {
        data = this.getData(code)
      } else if (code.match(/^[a-z]{2}$/)) {
        data = this.getDataByLanguage(code)
      } else if (code.match(/^[A-Z]{2}$/)) {
        data = this.getDataByCountry(code)
      }
    }
    return data
  }

  /**
     * Returns the language code by its full language-country
     *
     * Возвращает код языка по его полному язык-страна
     * @param code country code / код страна
     */
  static toLanguage (code) {
    return code.replace(/[^a-z]+/g, '')
  }

  /**
     * Returns the country code by its full language-country
     *
     * Возвращает код страны по ее полному язык-страна
     * @param code country code / код страна
     */
  static toCountry (code) {
    return code.replace(/[^A-Z]+/g, '')
  }

  /**
     * We get the full code by the data of the country
     *
     * Получаем полный код по данным страны
     * @param data data / данный
     */
  static toCode (data) {
    return data ? `${data?.language}-${data?.country}` : undefined
  }

  /**
     * Changes the data by the full code
     *
     * Изменяет данные по полному коду
     * @param code country code, full form language-country or one of them / код
     * страны, полный вид язык-страна или один из них
     * @param save save the result / сохранить результат
     */
  static set (code, save) {
    const data = this.findData(code)
    const language = this.toLanguage(code)
    this.data.value = {
      ...(data || this.getDataByCountry(this.findCountry()))
    }
    if (data && save) {
      this.storage.set(code)
    }
    this.focusLanguage.value = (0, data_1.isFilled)(language) ? language : this.data.value?.language
  }

  /**
     * Changes language
     *
     * Изменяет язык
     * @param language language / язык
     * @param save save the result / сохранить результат
     */
  static setLanguage (language, save) {
    this.set(`${language}-${this.country.value}`, save)
  }

  /**
     * Changes the country
     *
     * Изменяет страну
     * @param country language / язык
     * @param save save the result / сохранить результат
     */
  static setCountry (country, save) {
    this.set(`${this.lang.value}-${country}`, save)
  }

  static {
    this.storage = new StorageItem_1.StorageItem('geo-code')
    this.set(this.findLocation())
  }
}
exports.Geo = Geo
// # sourceMappingURL=Geo.js.map
