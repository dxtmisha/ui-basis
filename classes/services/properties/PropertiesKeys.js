/**
 * Key with all special keys for token processing
 *
 * Ключ со всеми специальными ключами для обработки токенов
 */
module.exports = class PropertiesKeys {
  /**
   * The parameter determines the type of property (for the user) / Параметр определяет
   * тип свойства (для пользователя)
   * @type {string}
   * @public
   */
  static type = '_type'

  /**
   * The key determines that the name of the property is the final version and does not require further processing
   *
   * Ключ определяет, что имя свойства является финальной версией и не требует дополнительной обработки
   * @type {string}
   * @public
   */
  static fullName = '_full-name'

  /**
   * The key determines that the property value is the final version and does not require further processing.
   *
   * Ключ определяет, что значение свойства является финальной версией и не требует дополнительной обработки.
   * @type {string}
   * @public
   */
  static fullValue = '_full-value'

  /**
   * The parameter determines the type of property / Параметр определяет тип свойства
   * @type {string}
   * @public
   */
  static variable = '__variable'

  /**
   * Ключ для хранения список источник данный для этого записи
   * @type {string}
   */
  static files = '__files'

  /**
   * The label, by which we determine that this is a part of a grouped name and it needs to
   * be optimized according to the data
   *
   * Метка, по которой определяем, что это часть группированного имени и его надо
   * оптимизировать по данным
   * @type {string}
   * @public
   */
  static wrap = '__wrap'

  /**
   * Checks if the variable is a special value
   *
   * Проверяет, является ли переменная специальным значением
   * @param {string} key key name / название ключа
   * @return {boolean}
   */
  static isSpecial (key) {
    return this.__special.indexOf(key) !== -1
  }

  static __special = [
    this.type,
    this.fullName,
    this.fullValue,
    this.variable,
    this.files,
    this.wrap
  ]
}
