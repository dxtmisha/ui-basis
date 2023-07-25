const { To } = require('../../To')

const SYMBOL_AVAILABLE = `[\\w-&?{}()., ${process.env.VUE_APP_TOKEN_SEPARATOR || '/'}]+`

module.exports = class PropertiesTool {
  /**
   * Checks whether the name is complete
   *
   * Проверяет, является ли название полным
   * @param {string} name key name / название ключа
   * @return {boolean}
   */
  static isFull (name) {
    return !!name.match(/^=|\|=/)
  }

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
   * Returns the property name, discarding its prefix
   *
   * Возвращает имя свойства, отбрасывая его префикс
   * @param {string} name key name / название ключа
   * @return {*}
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
   *
   * @param {string} name
   * @return {*}
   */
  static isVariableInName (name) {
    return !this.isScss(name) && name.match(new RegExp(`^.+([|].*?$|${SYMBOL_AVAILABLE})$`))
  }

  /**
   * Returns the variable type name from the property name
   *
   * Возвращает название типа переменной из названия свойства
   * @param {string} name key name / название ключа
   * @return {*}
   */
  static getVariableInName (name) {
    if (this.isScss(name)) {
      return 'scss'
    } else {
      return To.kebabCase(
        name.replace(new RegExp(`^(.*?)([|].*?$|${SYMBOL_AVAILABLE}$)`), '$1')
      )
    }
  }

  /**
   * Transformed key name by its type
   *
   * Преобразованное название ключа по его типу
   * @param {string} key property name / название свойства
   * @param {string|undefined} type property type / тип свойства
   * @return {string}
   */
  static reKey (key, type) {
    switch (type) {
      case 'media':
      case 'media-max':
        if (!key.match(/^media-/)) {
          return `media-${key}`
        }
        break
    }

    return key
  }
}
