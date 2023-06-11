const { To } = require('../To')

// const PropertiesItems = require('./PropertiesItems')
const PropertiesTool = require('./PropertiesTool')

const css = require('../../constructors/propertiesListCss.json')
const cssSelector = require('../../constructors/propertiesListCssSelector.json')
const cssVirtual = require('../../constructors/propertiesListCssVirtual.json')

const SYMBOLS = {
  '--': 'none',
  $: 'var',
  '@': 'link',
  '@@': 'link-class',
  ':': 'selector',
  '::': 'virtual',
  '~': 'section',
  '#': 'subclass',
  '&': 'scss'
}

const FILE_CACHE_VARIABLE = 'properties-variable'
const FILE_CACHE_VARIABLE_VAR = 'properties-variable-var'

/**
 * Class for performing data type conversions
 *
 * Класс для выполнения преобразования типов данных
 */
module.exports = class PropertiesVariable {
  /**
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Determine all properties and their property types in an object
   *
   * Определяем все свойства и их типы свойств в объекте
   */
  to () {
    const key = PropertiesTool.getKeyVariable()

    this.items.each(({
      item,
      name,
      design,
      component
    }) => {
      if (name === design) {
        item[key] = 'design'
      } else if (name === component) {
        item[key] = 'component'
      } else if (Object.keys(item?.value).length === 0) {
        item[key] = 'subclass'
      } else {
        const property = this.__getProperty(item, name)
        const variable = this.__getVariable(item, name)

        if (variable in SYMBOLS) {
          item[key] = SYMBOLS[variable]
        } else if (css.indexOf(property) !== -1) {
          item[key] = 'property'
        } else if (cssSelector.indexOf(property) !== -1) {
          item[key] = 'selector'
        } else if (cssVirtual.indexOf(property) !== -1) {
          item[key] = 'virtual'
        } else if ('value' in item) {
          item[key] = 'var'
        } else {
          item[key] = 'section'
        }
      }
    })

    this.items.cache(FILE_CACHE_VARIABLE)
  }

  /**
   * Updating all property types to 'var' if their ancestor had type 'var'
   *
   * Обновление всех типов свойств на 'var', если у его предка был тип 'var'
   */
  toByVar () {
    const key = PropertiesTool.getKeyVariable()

    this.items.each(({
      item,
      properties
    }) => {
      if (properties?.[key] === 'var') {
        item[key] = 'var'
      }
    })

    this.items.cache(FILE_CACHE_VARIABLE_VAR)
  }

  /**
   * Returns the name of a property for an element
   *
   * Возвращает название свойства у элемента
   * @param {Object<string,*>} item Object with data / Объект с данными
   * @param {string} name Key name / Название ключа
   * @return {string}
   * @private
   */
  __getProperty (item, name) {
    const key = PropertiesTool.getKeyRename()

    if (key in item) {
      return PropertiesTool.getName(item?.[key])
    } else {
      return name
    }
  }

  /**
   * Returns the type of property of an element
   *
   * Возвращает тип свойства у элемента
   * @param {Object<string,*>} item Object with data / Объект с данными
   * @param {string} name Key name / Название ключа
   * @return {string}
   * @private
   */
  __getVariable (item, name) {
    const key = PropertiesTool.getKeyVariable()
    const keyRename = PropertiesTool.getKeyRename()

    if (keyRename in item) {
      return PropertiesTool.getVariableInName(item?.[keyRename])
    } else if (key in item) {
      return To.kebabCase(item?.[key])
    } else {
      return PropertiesTool.getVariableInName(name)
    }
  }
}
