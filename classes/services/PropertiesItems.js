const { forEach } = require('../../functions/data')
const { To } = require('../To')

const PropertiesCache = require('./PropertiesCache')
const PropertiesTool = require('./PropertiesTool')

/**
 * Class for working with a list of all properties
 *
 * Класс для работы со списком всех свойств
 */
module.exports = class PropertiesItems {
  /**
   * @type {string[]}
   */
  designs = undefined

  /**
   * @param {Object<string,*>} properties
   */
  constructor (properties) {
    this.properties = properties
  }

  /**
   * Returns a list of design names
   *
   * Возвращает список названий дизайнов
   * @return {string[]}
   */
  getDesigns () {
    if (!this.designs) {
      this.designs = Object.keys(this.properties)
    }

    return this.designs
  }

  /**
   * Divides an index into sections
   *
   * Разделяет индекс на разделы
   * @param {string} index
   * @return {string[]}
   */
  getKeys (index) {
    return To.kebabCase(
      index.replace(/^\{|}$/ig, '')
    )
      .split('.')
  }

  /**
   * Returns link properties as a string
   *
   * Возвращает свойства ссылки в виде строки
   * @param {string} value
   * @return {Array<{name: string, property: Object<string,*>}>}
   */
  getItemByValue (value) {
    return forEach(PropertiesTool.getLinkByValue(value), name => {
      return {
        name,
        property: this.getItemByIndex(name)
      }
    })
  }

  /**
   * Returns values by index
   *
   * Возвращает значения по индексу
   * @param {string} index
   * @return {Object<string, *>|undefined}
   */
  getItemByIndex (index) {
    const keys = this.getKeys(index)
    let data = this.properties

    keys.forEach(key => {
      if (data) {
        key = key.trim()
        data = data?.value?.[key] || data?.[key]
      }
    })

    return data
  }

  /**
   * Recursively applies a custom function to each element of the property
   *
   * Рекурсивно применяет пользовательскую функцию к каждому элементу свойства
   * @param {({item?: Object<string,*>, name?: string, design?: string, component?: string, properties?: Object<string,*>, options?: Object<string,*>}) => *[]} callback
   * @param {Object.<string,*>} properties
   * @param {Object.<string,*>|undefined} parent
   * @param {{isValue?: boolean, options?: Object<string,*>}} options
   * @param {string|undefined} design
   * @param {string|undefined} component
   * @returns {*[]}
   */
  each (
    callback,
    options = {},
    properties = this.properties,
    parent = undefined,
    design = undefined,
    component = undefined
  ) {
    const data = []

    if (!('options' in options)) {
      options.options = {}
    }

    forEach(properties, (item, name) => {
      if (!PropertiesTool.isSpecial(name)) {
        const itemDesign = design || To.kebabCase(name)
        const itemComponent = design ? (component || To.kebabCase(name)) : undefined

        if (!('value' in item)) {
          data.push(...this.each(callback, options, item, item, itemDesign, itemComponent))
        } else {
          const isObject = typeof item.value === 'object'
          const argumentsFn = {
            item,
            name,
            design: itemDesign,
            component: itemComponent,
            properties: parent,
            options: options.options
          }

          const value = (!options?.isValue || !isObject) ? callback(argumentsFn) : undefined

          if (isObject) {
            data.push(...this.each(callback, options, item.value, item, itemDesign, itemComponent))
          }

          if (value !== undefined) {
            data.push(value)
          }
        }
      }
    })

    return data
  }

  /**
   * Caching the result
   *
   * Сохранение результата в кеш
   * @param {string} name
   * @param {Object<string,*>} data
   * @return {PropertiesItems}
   */
  cache (name, data = this.properties) {
    PropertiesCache.create([], name, data)

    return this
  }
}
