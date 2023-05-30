'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.StorageData = exports.cacheAgeDefault = exports.prefix = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
const Env_1 = require('./Env')
exports.prefix = Env_1.Env.prefix()
exports.cacheAgeDefault = Env_1.Env.cache()
/**
 * An object used for storing data
 *
 * Объект, используемый для хранения данных
 */
class StorageData {
  method
  /**
     * Storage index
     *
     * Хранилище индексов
     * @private
     */
  index
  item = (0, vue_1.ref)()
  date
  /**
     * Constructor
     * @param name group of records, from which we get data / группа записей, по которой
     * получаем данные
     * @param key key / ключ
     * @param method class, with which we will work / класс, с которым будем работать
     */
  constructor (name, key, method) {
    this.method = method
    this.index = `${exports.prefix}-${name}-${key}`
    if (objects.has(this.index)) {
      return objects.get(this.index)
    } else {
      const item = this.getObject()
      this.item.value = item.item
      this.date = item.date
      this.watch()
      objects.set(this.index, this)
    }
  }

  /**
     * Is the value old relative to age
     *
     * Является ли значение старым относительно возраста
     * @param age age being checked / возраст, который проверяется
     */
  isOld (age) {
    return (this.date || 0) + ((age || exports.cacheAgeDefault) * 1000) < new Date().getTime()
  }

  get () {
    return this.item.value
  }

  getItem () {
    return this.item
  }

  set (value) {
    this.item.value = value
    return this
  }

  /**
     * The method of Date instances returns the number of milliseconds
     * for this date since the epoch
     *
     * Метод возвращает числовое значение, соответствующее указанной дате по
     * всемирному координированному времени
     * @private
     */
  getDate () {
    return new Date().getTime()
  }

  /**
     * The method of the Storage interface, when passed a key name,
     * will return that key's value
     *
     * Метод вернёт значение, лежащее в хранилище по указанному ключу
     * @private
     */
  getObject () {
    const read = this.method?.getItem(this.index)
    if (read) {
      try {
        return JSON.parse(read)
      } catch (e) {
      }
    }
    return {
      item: undefined,
      date: 0
    }
  }

  /**
     * The method of the Storage interface, when passed a key name and value,
     * will add that key to the given Storage object
     *
     * Если методу интерфейса Storage передать ключ и значение,
     * то в хранилище будет добавлено соответствующее ключу значение
     * @private
     */
  setItem () {
    this.method?.setItem(this.index, JSON.stringify({
      item: this.item.value,
      date: this.getDate()
    }))
    return this
  }

  /**
     * The method of the Storage interface, when passed a key name, will
     * remove that key from the given Storage object if it exists
     *
     * Если методу интерфейса Storage передать ключ, то из хранилища будет удалён
     * элемент с указанным ключом
     * @private
     */
  removeItem () {
    this.method?.removeItem(this.index)
    return this
  }

  watch () {
    (0, vue_1.watch)(this.item, value => {
      this.date = this.getDate()
      if ((0, data_1.isNull)(value)) {
        this.removeItem()
      } else {
        this.setItem()
      }
    })
    return this
  }
}
exports.StorageData = StorageData
const objects = new Map()
// # sourceMappingURL=StorageData.js.map
