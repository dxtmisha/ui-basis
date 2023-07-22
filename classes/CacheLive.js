'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.CacheLive = void 0
const data_1 = require('../functions/data')
/**
 * Class for working with fast cache during code execution
 *
 * Класс для работы с быстрым кэшем во время выполнения кода
 */
class CacheLive {
  static data = {}
  /**
     * Getting data for the cache, and if there is no cache, it performs a function to save the cache
     *
     * Получение данных для кэша, и если нет кэша, выполняет функцию для сохранения кэша
     * @param name cache name / название кэша
     * @param callback function for the cache / функция для кэша
     */
  static get (name, callback) {
    if (!(name in this.data)) {
      this.set(name, callback)
    }
    return this.data[name]
  }

  /**
     * Overwrites or adds new values for the cache
     *
     * Перезаписывает или добавляет новые значения для кэша
     * @param name cache name / название кэша
     * @param valueCallback if you pass a function, it will execute when there is no value
     * and save the values / если вы передадите функцию, она выполнится при отсутствии
     * значения и сохранит значения
     */
  static set (name, valueCallback) {
    this.data[name] = (0, data_1.executeFunction)(valueCallback)
  }
}
exports.CacheLive = CacheLive
// # sourceMappingURL=CacheLive.js.map
