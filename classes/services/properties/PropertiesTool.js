const { To } = require('../../To')

const Keys = require('./PropertiesKeys')
const Type = require('./PropertiesType')

const SYMBOL_SEPARATOR = process.env.VUE_APP_TOKEN_SEPARATOR || Keys.SEPARATOR
const SYMBOL_AVAILABLE = `[\\w-&?{}()., ${SYMBOL_SEPARATOR}]+`

/**
 * Common class with diverse functionality
 *
 * Общий класс с разнообразным функционалом
 */
module.exports = class PropertiesTool {
  /**
   * Is the property a SCSS selector
   *
   * Является ли свойство выборки SCSS
   * @param {string} name key name / название ключа
   * @return {boolean}
   */
  static isScss (name) {
    return !!name.match(/^&/)
  }

  /**
   * Is the property extraction SCSS for @at-root
   *
   * Является ли свойство выборки SCSS для @at-root
   * @param {string} name key name / название ключа
   * @return {boolean}
   */
  static isRoot (name) {
    return !!name.match(/^&&/)
  }

  /**
   * Returns the property name, discarding its prefix
   *
   * Возвращает имя свойства, отбрасывая его префикс
   * @param {string} name key name / название ключа
   * @return {string}
   */
  static getName (name) {
    if (this.isScss(name)) {
      return name
    } else {
      return To.kebabCase(
        name.replace(new RegExp(`^(.*?)(${SYMBOL_AVAILABLE})$`), '$2')
      )
    }
  }

  /**
   * Checks if there is a type in the name of the property
   *
   * Проверяет, если есть тип в названии свойства
   * @param {string} name key name / название ключа
   * @return {boolean}
   */
  static isVariableInName (name) {
    return !this.isScss(name) && name.match(new RegExp(`^.+([|].*?$|${SYMBOL_AVAILABLE})$`))
  }

  /**
   * Returns the variable type name from the property name
   *
   * Возвращает название типа переменной из названия свойства
   * @param {string} name key name / название ключа
   * @return {string}
   */
  static getVariableInName (name) {
    if (this.isRoot(name)) {
      return Type.root
    } else if (this.isScss(name)) {
      return Type.scss
    } else {
      return To.kebabCase(
        name.replace(new RegExp(`^(.*?)([|].*?$|${SYMBOL_AVAILABLE}$)`), '$1')
      )
    }
  }

  /**
   * Checks whether a value is a reference
   *
   * Проверяет, является ли значение ссылкой
   * @param {string} value values of properties from the value field / значения свойств из поля value
   * @return {boolean}
   */
  static isLink (value) {
    return typeof value === 'string' && !!value.match(/{[^{}]+}/)
  }

  /**
   * Returns a list of link values
   *
   * Возвращает список значений ссылок
   * @param {string} value values of properties from the value field / значения свойств из поля value
   * @return {string[]}
   */
  static getLinkList (value) {
    return value.match(/{[^{}]+}/g)
  }

  /**
   * Transformed key name by its type
   *
   * Преобразованное название ключа по его типу
   * @param {string} key property name / название свойства
   * @param {string|undefined} type property type / тип свойства
   * @return {string}
   */
  static reKey (key, type = undefined) {
    if (type) {
      switch (type) {
        case Type.media:
        case Type.mediaMax:
          if (!key.match(/^media-/)) {
            return `media-${key}`
          }
          break
      }
    }

    return To.kebabCase(
      SYMBOL_SEPARATOR !== Keys.SEPARATOR
        ? key.replace(process.env.VUE_APP_TOKEN_SEPARATOR, Keys.SEPARATOR)
        : key
    )
  }
}
