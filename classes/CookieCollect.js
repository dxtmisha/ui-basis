'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.CookieCollect = exports.cacheAgeDefault = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
const Env_1 = require('./Env')
const StorageItem_1 = require('./StorageItem')
exports.cacheAgeDefault = Env_1.Env.cache()
/**
 * Class for managing cookies
 *
 * Класс для управления cookie-файлами
 */
class CookieCollect {
  static data = new Map()
  static block = new StorageItem_1.StorageItem('cookie-block')
  static get (key) {
    return this.data.has(key) ? this.data.get(key) : this.newItem(key)
  }

  static set (key, value) {
    if (value) {
      if (this.data.has(key)) {
        this.get(key).item.value = value
      } else {
        this.newItem(key, value)
        this.update(key)
      }
    } else {
      this.remove(key)
    }
  }

  static setBlock (value) {
    this.block.set(value ? '1' : undefined)
  }

  static remove (key) {
    if (this.data.has(key)) {
      this.data.delete(key)
      this.update(key)
    }
  }

  /**
     * Creating a new entry in a Map
     *
     * Создание новой записи в Map
     * @param key key of the value / ключ значения
     * @param value значения обновления
     * @private
     */
  static newItem (key, value) {
    const item = {
      item: (0, vue_1.ref)(value || ''),
      age: exports.cacheAgeDefault,
      sameSite: 'strict',
      argument: []
    }
    this.data.set(key, item);
    (0, vue_1.watch)(item.item, () => this.update(key))
    return item
  }

  /**
     * Updating data by key
     *
     * Обновление данных по ключу
     * @param key key of the value / ключ значения
     * @private
     */
  static update (key) {
    const item = this.get(key)
    const age = (0, data_1.isFilled)(item.item.value) ? item.age : -1
    if (this.block.getStatic() !== '1') {
      document.cookie = [
                `${encodeURIComponent(key)}=${encodeURIComponent(item.item.value || '')}`,
                `max-age=${age}`,
                `SameSite=${item.sameSite}`,
                ...item.argument
      ].join('; ')
    }
  }

  static {
    for (const item of document.cookie.split(';')) {
      const [key, value] = item.trim().split('=')
      if (key && (0, data_1.isFilled)(value)) {
        this.newItem(key, value)
      }
    }
  }
}
exports.CookieCollect = CookieCollect
// # sourceMappingURL=CookieCollect.js.map
