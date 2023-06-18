const { To } = require('../To')

// const PropertiesItems = require('./PropertiesItems')
const PropertiesTool = require('./PropertiesTool')

const css = require('../../constructors/propertiesListCss.json')
const cssSelector = require('../../constructors/propertiesListCssSelector.json')
const cssVirtual = require('../../constructors/propertiesListCssVirtual.json')

const TYPE = [
  'design',
  'component',
  'class',
  'var',
  'property',
  'selector',
  'state',
  'virtual',
  'subclass',
  'scss',
  'media',
  'media-max',
  'animate',
  'link',
  'link-class',
  'mixin',
  'none'
]

const SYMBOLS = {
  '--': 'none',
  $: 'var',
  '@': 'link',
  '@@': 'link-class',
  ':': 'selector',
  '::': 'virtual',
  '~': 'state',
  '#': 'subclass',
  '&': 'scss'
}

const FILE_CACHE_VARIABLE = 'properties-variable'
const FILE_CACHE_VARIABLE_VAR = 'properties-variable-var'
const FILE_CACHE_VARIABLE_LINK = 'properties-variable-link'

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
    const keyCategory = PropertiesTool.getKeyCategory()

    this.items.each(({
      item,
      name,
      design,
      component
    }) => {
      if (item?.[keyCategory] === 'root') {
        item[key] = 'var'
      } else if (name === design) {
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
        } else if (TYPE.indexOf(variable) !== -1) {
          item[key] = variable
        } else if (css.indexOf(property) !== -1) {
          item[key] = 'property'
        } else if (cssSelector.indexOf(property) !== -1) {
          item[key] = 'selector'
        } else if (cssVirtual.indexOf(property) !== -1) {
          item[key] = 'virtual'
        } else if (typeof item?.value !== 'object') {
          item[key] = 'var'
        } else {
          item[key] = 'state'
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
   * Updating all property types to 'link' if the value is pointing to an object
   *
   * Обновление всех типов свойств на 'link', если значение указывается на объект
   */
  toByLink () {
    const key = PropertiesTool.getKeyVariable()

    this.items.each(({
      item,
      design,
      component
    }) => {
      if (
        ['var', 'property'].indexOf(item?.[key]) !== -1 &&
        PropertiesTool.isLink(item?.value) &&
        this.__isLink(item, design, component)
      ) {
        item[key] = 'link'
      }
    })

    this.items.cache(FILE_CACHE_VARIABLE_LINK)
  }

  /**
   * Checks whether a reference points to the specified object
   *
   * Проверяет, указывает ли ссылка на указанный объект
   * @param {Object<string,*>} item
   * @param {string} design
   * @param {string} component
   * @return {boolean}
   * @private
   */
  __isLink (
    item,
    design,
    component
  ) {
    const index = PropertiesTool.toFull(
      item?.value,
      design,
      component,
      this.items.getDesigns()
    )

    return typeof this.items.getItemByIndex(index)?.value === 'object'
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

    return (
      key in item ? PropertiesTool.getName(item?.[key]) : name
    ).replace(/\(.*?$/, '')
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
