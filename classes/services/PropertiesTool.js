const { To } = require('../To')

const SYMBOL_AVAILABLE = '[\\w-??]+'

const KEY_NAME = '__name'
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
   * @param {string} name Key name / Название ключа
   * @return {boolean}
   */
  static isSpecial (name) {
    return KEYS_SPECIAL.indexOf(name) !== -1
  }

  /**
   * Returns the property name, discarding its prefix
   *
   * Возвращает имя свойства, отбрасывая его префикс
   * @param {string} name Key name / Название ключа
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
   * @param {string} name Key name / Название ключа
   * @return {*}
   */
  static getVariableInName (name) {
    return To.kebabCase(
      name.replace(new RegExp(`^(.*?)[|]?${SYMBOL_AVAILABLE}$`), '$1')
    )
  }

  /**
   * Returns a key for the property name
   *
   * Возвращает ключ для названия свойства
   * @return {string}
   */
  static getKeyName () {
    return KEY_NAME
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

  /**
   * Returns a list of link values
   *
   * Возвращает список значений ссылок
   * @param {string} value
   * @return {string[]}
   */
  static getLinkByValue (value) {
    return value.match(/{[^{}]+}/ig)
  }

  /**
   * Replaces labels with design and component names
   *
   * Заменяет метки на названия дизайна и компонента
   * @param {string} value
   * @param {string} design Design name / Название дизайна
   * @param {string} component Component name / Название компонента
   * @param {string[]} designs List of design names / Список названий дизайнов
   * @return {string}
   */
  static toFull (value, design, component, designs) {
    if (value.match(/(?<=\{)\?/)) {
      return value
        .replace(/(?<=\{)\?\?/g, `${design}.${component}.`)
        .replace(/(?<=\{)\?/g, `${design}.`)
    } else {
      return this.toFullByDesigns(value, design, designs)
    }
  }

  /**
   * Adds the name of the design at the beginning if it is missing
   *
   * Добавляет название дизайна в начало, если его нет
   * @param {string} value
   * @param {string} design Design name / Название дизайна
   * @param {string[]} designs List of design names / Список названий дизайнов
   * @returns {string}
   */
  static toFullByDesigns (value, design, designs) {
    return value?.replace(/(?<=\{)[^.{}]+/, name => {
      if (designs.indexOf(name) === -1) {
        return `${design}.${name}`
      } else {
        return name
      }
    })
  }
}
