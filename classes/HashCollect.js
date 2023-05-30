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
  static get (key) {
    return this.data.has(key) ? this.data.get(key) : this.newItem(key)
  }

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
     * @param key
     * @param value
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
