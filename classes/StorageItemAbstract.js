'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.StorageItemAbstract = void 0
const StorageAbstract_1 = require('./StorageAbstract')
const StorageData_1 = require('./StorageData')
/**
 * Abstract class for working with storage
 *
 * Абстрактный класс для работы с хранилищем
 */
class StorageItemAbstract extends StorageAbstract_1.StorageAbstract {
  item
  /**
     * Constructor
     * @param name group of records, from which we get data / группа записей, по которой
     * получаем данные
     * @param key key / ключ
     * @param method class, with which we will work / класс, с которым будем работать
     * @protected
     */
  constructor (name, key, method) {
    const item = new StorageData_1.StorageData(name, key, method)
    super(key, item.getItem())
    this.item = new StorageData_1.StorageData(name, key, method)
  }

  /**
     * Getting data with respect to the caching timer
     *
     * Получение данных с учетом таймера кэширования
     * @param callback called function / вызываемая функция
     * @param age cache time / время кэширования
     */
  async cache (callback, age) {
    return (await this.setByCache(callback, age)).get()
  }

  /**
     * Getting data with respect to the caching timer
     *
     * Получение данных с учетом таймера кэширования
     * @param callback called function / вызываемая функция
     * @param age cache time / время кэширования
     */
  async cacheStatic (callback, age) {
    return (await this.setByCache(callback, age)).getStatic()
  }

  /**
     * Fixes taking into account caching time
     *
     * Исправления с учетом времени кэширования
     * @param callback called function / вызываемая функция
     * @param age cache time / время кэширования
     */
  async setByCache (callback, age) {
    if (callback &&
            this.item.isOld(age)) {
      this.set(await callback())
    }
    return this
  }
}
exports.StorageItemAbstract = StorageItemAbstract
// # sourceMappingURL=StorageItemAbstract.js.map
