const { To } = require('../To')

const AVAILABLE_SYMBOL = '[\\w-??]+'
const DELIMITER_SYMBOL = '.'

const DEFAULT_NAME = '__default'
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

const SPECIALIST = [
  'value',
  'type',
  DEFAULT_NAME,
  RENAME_NAME,
  VARIABLE_NAME
]

const css = require('../../constructors/propertiesListCss.json')
const cssSelector = require('../../constructors/propertiesListCssSelector.json')
const cssVirtual = require('../../constructors/propertiesListCssVirtual.json')
const { isFilled } = require('../../functions/data')

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

  /**
   * Checks if the variable is a special value
   *
   * Проверяет, является ли переменная специальным значением
   * @param {string} variable
   * @return {boolean}
   */
  static isSpecialist (variable) {
    return SPECIALIST.indexOf(variable) !== -1
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
   * Converting a link string to standard form
   *
   * Преобразование строки ссылки в стандартный вид
   * @param {string} link
   * @param {string} design Design name for replacement / Название дизайна для замены
   * @param {string} component Component name for replacement / Название компонента для замены
   * @return {string[]}
   */
  static getLinkByStandard (link, design, component = undefined) {
    const data = To.kebabCase(
      this.removeBrackets(link)
        .replace(/^\?\?/, `${design}.${this.__toLinkComponent(component)}`)
        .replace(/^\?/, `${design}.`)
    )
      .split(DELIMITER_SYMBOL)

    if (data[0] !== design) {
      data.unshift(design)
    }

    return data
  }

  /**
   * Returns an index for storing the property type
   *
   * Возвращает индекс для хранения типа свойства
   * @return {string}
   */
  static getVariableName () {
    return VARIABLE_NAME
  }

  /**
   * Removing parentheses from the value
   *
   * Убираем скобки у значения
   * @param {string} value
   * @return {string}
   */
  static removeBrackets (value) {
    return value.replace(/^\{([\S\s]+)}$/, '$1')
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
      } else if ('value' in item) {
        variable = 'var'
      } else {
        variable = 'section'
      }

      item[VARIABLE_NAME] = variable
    }
  }

  /**
   * Adds the component name to the link
   *
   * Добавляет в ссылку название компонента
   * @param {string} component
   * @return {string}
   * @private
   */
  static __toLinkComponent (component) {
    return isFilled(component) ? `${component}.` : ''
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
