'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.HashCollect = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
/**
 * Class for managing hash strings
 *
 * Класс для управления hash-строкой
 */
class HashCollect {
  static data = new Map()
  /**
     * Getting a value by its key
     *
     * Получение значения по его ключу
     * @param key key name / названия ключа
     */
  static get (key) {
    return this.data.has(key) ? this.data.get(key) : this.newItem(key)
  }

  /**
     * Changing a value by its key
     *
     * Изменение значения по его ключу
     * @param key key name / названия ключа
     * @param value new values / новые значения
     */
  static set (key, value) {
    if (value) {
      if (this.data.has(key)) {
        this.get(key).value = value
      } else {
        this.newItem(key, value)
        this.collect()
      }
    } else {
      this.remove(key)
    }
  }

  /**
     * Deleting a record
     *
     * Удаление записи
     * @param key key name / названия ключа
     */
  static remove (key) {
    if (this.data.has(key)) {
      this.data.delete(key)
      this.collect()
    }
  }

  /**
     * Creating a new entry in a Map
     *
     * Создание новой записи в Map
     * @param key key name / названия ключа
     * @param value new values / новые значения
     * @private
     */
  static newItem (key, value) {
    const item = (0, vue_1.ref)(value || '')
    this.data.set(key, item);
    (0, vue_1.watch)(item, () => this.collect())
    return item
  }

  /**
     * Обновления данных в хеш
     *
     * Обновления данный в hash
     * @protected
     */
  static collect () {
    const hash = (0, data_1.forEach)(this.data, (item, key) => (0, data_1.isFilled)(item.value) ? `${key}=${encodeURIComponent(item.value)}` : '')
    if (hash) {
      hash.sort()
      history.replaceState(null, '', `#${hash.join(';')}`)
    }
  }

  /**
     * Translation: "Processing a hash string to obtain data
     *
     * Обработка строки hash для получения данных
     */
  static init () {
    location.hash.replace(/([\w-]+)[:=]([^;]+)/ig, (all, key, value) => {
      this.newItem(key, value)
      return ''
    })
  }

  static {
    this.init()
  }
}
exports.HashCollect = HashCollect
// # sourceMappingURL=HashCollect.js.map
