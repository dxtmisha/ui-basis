'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Env = void 0
/**
 * Class for working with Env variables from Vue
 *
 * Класс для работы с Env переменными от Vue
 */
class Env {
  /**
     * Get values by key without the prefix VUE_APP_
     *
     * Получить значения по ключу без приставки VUE_APP_
     * @param key key / ключ
     * @param value returns value when the value is absent / возвращает value при
     * отсутствии значения
     */
  static get (key, value) {
    return process.env?.[`VUE_APP_${key}`] || value || ''
  }

  /**
     * Get values as a number
     *
     * Получить значения в виде числа
     * @param key key / ключ
     * @param value returns value when the value is absent / возвращает value при
     * отсутствии значения
     */
  static getInt (key, value = 0) {
    return parseFloat(this.get(key, value.toString())) || 0
  }

  /**
     * Returns CACHE
     *
     * Возвращает CACHE
     */
  static cache () {
    return this.getInt('CACHE', 7 * 24 * 60 * 60)
  }

  /**
     * Returns LANGUAGE
     *
     * Возвращает LANGUAGE
     */
  static language () {
    return this.get('LANGUAGE', 'en-GB')
  }

  /**
     * Returns PREFIX
     *
     * Возвращает PREFIX
     */
  static prefix () {
    return this.get('PREFIX', '_d_')
  }
}
exports.Env = Env
// # sourceMappingURL=Env.js.map
