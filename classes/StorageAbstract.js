'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.StorageAbstract = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
/**
 * Basic abstract class for managing data storage
 *
 * Базовый абстрактный класс для управления хранением данных
 */
class StorageAbstract {
  key
  value
  /**
     * Constructor
     * @param key key / ключ
     * @param value
     * @param defaultValue default values / значения по умолчанию
     * @protected
     */
  constructor (key, value, defaultValue) {
    this.key = key
    this.value = value
    if (!this.is() && defaultValue) {
      this.set((0, data_1.executeFunction)(defaultValue))
    }
  }

  /**
     * Is the value filled
     *
     * Заполнено ли значение
     */
  is () {
    return (0, data_1.isFilled)(this.value.value)
  }

  /**
     * Data retrieval
     *
     * Получение данных
     * @param valueCallback If you pass a function, it will execute when there is no value
     * and save the values / Если вы передадите функцию, она выполнится при отсутствии
     * значения и сохранит значения
     */
  get (valueCallback) {
    return (0, vue_1.computed)(() => this.getStatic(valueCallback))
  }

  /**
     * Data retrieval
     *
     * Получение данных
     * @param valueCallback If you pass a function, it will execute when there is no value
     * and save the values / Если вы передадите функцию, она выполнится при отсутствии
     * значения и сохранит значения
     */
  getStatic (valueCallback) {
    if (!(0, data_1.isNull)(this.value.value)) {
      return this.value.value
    } else if ((0, data_1.isFunction)(valueCallback)) {
      this.set(valueCallback())
      return this.value.value
    } else if ((0, vue_1.isRef)(valueCallback)) {
      return valueCallback.value
    } else {
      return valueCallback
    }
  }

  getKey () {
    return this.key
  }

  /**
     * Getting the most reactive variable
     *
     * Получение самой реактивной переменной
     */
  getItem () {
    return this.value
  }

  /**
     * Asynchronous execution of a function when the value is absent
     *
     * Асинхронное выполнение функции при отсутствии значения
     * @param callback executed function / выполняемая функция
     */
  async getAsync (callback) {
    await this.getAsyncStatic(callback)
    return this.value
  }

  /**
     * Asynchronous execution of a function when the value is absent
     *
     * Асинхронное выполнение функции при отсутствии значения
     * @param callback executed function / выполняемая функция
     */
  async getAsyncStatic (callback) {
    if ((0, data_1.isNull)(this.value.value)) {
      this.set(await callback())
    }
    return this.value.value
  }

  /**
     * Change the data
     *
     * Изменить данные
     * @param value value / значение
     */
  set (value) {
    this.value.value = value
    return this
  }

  /**
     * Deletion of the value
     *
     * Удаление значения
     */
  remove () {
    this.value.value = undefined
    return this
  }
}
exports.StorageAbstract = StorageAbstract
// # sourceMappingURL=StorageAbstract.js.map
