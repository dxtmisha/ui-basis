const { To } = require('../To')

const AVAILABLE_SYMBOL = '[\\w-??]+'
const RENAME_NAME = '__rename'
const VARIABLE_NAME = '__variable'
const VARIABLE_SYMBOL = {
  '--': 'none',
  '@@': 'link-class',
  '@': 'link',
  '#': 'subclass',
  '~': 'section',
  $: 'var',
  '::': 'virtual',
  ':': 'selector',
  '&': 'scss'
}

const css = require('../../constructors/propertiesListCss.json')
const cssSelector = require('../../constructors/propertiesListCssSelector.json')
const cssVirtual = require('../../constructors/propertiesListCssVirtual.json')

/**
 * Class for working with property types and basic structures
 *
 * Класс для работы с типами свойств и базовыми структурами
 */
module.exports = class PropertiesVariable {
  /**
   * Updates the record structure
   *
   * Обновляет структуру записи
   * @param {string} name
   * @param {Object<string,*>} item
   * @return {*}
   */
  static init (name, item) {
    this.__toType(name, item)
    this.__toVariable(name, item)

    return item
  }

  static getNone () {
    return {
      type: 'none',
      [VARIABLE_NAME]: 'none'
    }
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
      name.replace(new RegExp(`^(.*?)(${AVAILABLE_SYMBOL})$`), '$2')
    )
  }

  /**
   * Type processing and name conversion
   *
   * Обработка типа и преобразование названия
   * @param {string} name
   * @param {Object<string,*>} item
   * @private
   */
  static __toType (name, item) {
    item.type = this.getName(item?.[RENAME_NAME] || item?.type || name)
  }

  /**
   * Determines the variable type
   *
   * Определяет тип переменной
   * @param {string} name
   * @param {Object<string,*>} item
   * @private
   */
  static __toVariable (name, item) {
    if (VARIABLE_NAME in item) {
      item[VARIABLE_NAME] = To.kebabCase(item[VARIABLE_NAME])
    } else {
      const property = this.getName(name)
      let variable = this.__getVariableInName(item?.[RENAME_NAME] || name)

      if (variable in VARIABLE_SYMBOL) {
        variable = VARIABLE_SYMBOL[variable]
      } else if (css.indexOf(property) !== -1) {
        variable = 'property'
      } else if (cssSelector.indexOf(property) !== -1) {
        variable = 'selector'
      } else if (cssVirtual.indexOf(property) !== -1) {
        variable = 'virtual'
      } else {
        variable = 'var'
      }

      item[VARIABLE_NAME] = variable
    }
  }

  /**
   * Returns the variable type name from the property name
   *
   * Возвращает название типа переменной из названия свойства
   * @param {string} name
   * @return {*}
   */
  static __getVariableInName (name) {
    return name.replace(new RegExp(`^(.*?)[|]?${AVAILABLE_SYMBOL}$`), '$1')
  }
}
