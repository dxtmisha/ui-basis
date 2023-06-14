const { To } = require('../To')

const SYMBOL_AVAILABLE = '[\\w-??]+'

const KEY_NAME = '_name'
const KEY_CATEGORY = '_category'
const KEY_DEFAULT = '_default'
const KEY_RENAME = '_rename'
const KEY_VARIABLE = '_variable'
const KEY_CSS = '_css'
const KEY_FULL = '_fullName'
const KEY_FULL_VALUE = '_fullValue'

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
   * Checks whether the name is complete
   *
   * Проверяет, является ли название полным
   * @param {string} name Key name / Название ключа
   * @return {boolean}
   */
  static isFull (name) {
    return !!name.match(/^=|\|=/)
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
   * Returns a key for the category
   *
   * Возвращает ключ для категории
   * @return {string}
   */
  static getKeyCategory () {
    return KEY_CATEGORY
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
   * Returns a key for the CSS value
   *
   * Возвращает ключ для значения CSS
   * @return {string}
   */
  static getKeyCss () {
    return KEY_CSS
  }

  /**
   * Returns a key to determine if the name is full
   *
   * Возвращает ключ для определения, является ли имя полным
   * @return {string}
   */
  static getKeyFull () {
    return KEY_FULL
  }

  /**
   * Returns a key that determines if the value is fixed
   *
   * Возвращает ключ, который определяет, является ли значение фиксированным
   * @return {string}
   */
  static getKeyFullValue () {
    return KEY_FULL_VALUE
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
    return value?.replace(/(?<=\{)[^.{}]+/g, name => {
      if (designs.indexOf(name) === -1) {
        return `${design}.${name}`
      } else {
        return name
      }
    })
  }
}
