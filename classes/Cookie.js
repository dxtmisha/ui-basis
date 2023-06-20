'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Cookie = void 0
const StorageAbstract_1 = require('./StorageAbstract')
const CookieCollect_1 = require('./CookieCollect')
/**
 * Class for working with cookies
 *
 * Класс для управления Cookie
 */
class Cookie extends StorageAbstract_1.StorageAbstract {
  item
  constructor (key, defaultValue) {
    const item = CookieCollect_1.CookieCollect.get(key)
    super(key, item.item, defaultValue)
    this.item = item
    if (objects.has(key)) {
      return objects.get(key)
    }
  }

  /**
     * Send a cookie
     *
     * Отправляет cookie
     * @param value The value of the cookie / Значение cookie
     * @param age The time the cookie expires / Время, когда срок действия
     * cookie истекает
     * @param sameSite The value of the sameSite element should be either None,
     * Lax or Strict / Значение элемента sameSite должно быть либо None, либо Lax,
     * либо Strict
     * @param argument An associative array which may have any of the keys expires,
     * path, domain, secure, httponly and sameSite / Ассоциативный массив (array), который
     * может иметь любой из ключей: expires, path, domain, secure, httponly и sameSite
     */
  set (value, age, sameSite, argument) {
    this.setAge(age)
      .setSameSite(sameSite)
      .setArgument(argument)
    super.set(value.toString().trim())
    return this
  }

  /**
     * The time the cookie expires
     *
     * Время, когда срок действия cookie истекает
     * @param value
     * @private
     */
  setAge (value) {
    if (value !== undefined) {
      this.item.age = value
    }
    return this
  }

  /**
     * Prevents the browser from sending this cookie along with cross-site requests.
     * Possible values for the flag are lax or strict.
     *
     * Не позволяет браузеру отправлять этот файл cookie вместе с межсайтовыми запросами.
     * Возможные значения флага: lax или strict.
     * @param value
     * @private
     */
  setSameSite (value) {
    if (value !== undefined) {
      this.item.sameSite = value
    }
    return this
  }

  /**
     * Changes of properties of the writing cookie
     *
     * Изменения свойств записывающего cookie
     * @param value
     * @private
     */
  setArgument (value) {
    if (value !== undefined) {
      this.item.argument = value
    }
    return this
  }
}
exports.Cookie = Cookie
const objects = new Map()
// # sourceMappingURL=Cookie.js.map
