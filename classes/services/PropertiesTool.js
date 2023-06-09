const { To } = require('../To')

const SYMBOL_AVAILABLE = '[\\w-??]+'

const KEY_DEFAULT = '__default'
const KEY_RENAME = '__rename'
const KEY_VARIABLE = '__variable'

const KEYS_SPECIAL = [
  'value',
  'type',
  KEY_DEFAULT,
  KEY_RENAME,
  KEY_VARIABLE
]

module.exports = class PropertiesTool {
  /**
   * Checks if the variable is a special value
   *
   * Проверяет, является ли переменная специальным значением
   * @param {string} variable
   * @return {boolean}
   */
  static isSpecial (variable) {
    return KEYS_SPECIAL.indexOf(variable) !== -1
  }

  /**
   * Returns the property name, discarding its prefix
   *
   * Возвращает имя свойства, отбрасывая его префикс
   * @param {string} name
   * @return {*}
   */
  static getName (name) {
    return To.kebabCase(
      name.replace(new RegExp(`^(.*?)(${SYMBOL_AVAILABLE})$`), '$2')
    )
  }

  /**
   * Returns the variable type name from the property name
   *
   * Возвращает название типа переменной из названия свойства
   * @param {string} name
   * @return {*}
   */
  static getVariableInName (name) {
    return To.kebabCase(
      name.replace(new RegExp(`^(.*?)[|]?${SYMBOL_AVAILABLE}$`), '$1')
    )
  }

  /**
   * Returns a key for renaming a value
   *
   * Возвращает ключ для переименования значения
   * @return {string}
   */
  static getKeyRename () {
    return KEY_RENAME
  }

  /**
   * Returns a key for storing the property type
   *
   * Возвращает ключ для хранения типа свойства
   * @return {string}
   */
  static getKeyVariable () {
    return KEY_VARIABLE
  }
}
