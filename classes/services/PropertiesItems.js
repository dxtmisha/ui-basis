const { To } = require('../To')
const { forEach } = require('../../functions/data')

const PropertiesCache = require('./PropertiesCache')
const PropertiesTool = require('./PropertiesTool')

const FILE_CACHE_VALUE = 'properties-items-value'
const FILE_CACHE_VALUE_FIX = 'properties-items-value-fix'
const FILE_CACHE_VALUE_DESIGN = 'properties-items-value-design'

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
   * Recursively applies a custom function to each element of the property
   *
   * Рекурсивно применяет пользовательскую функцию к каждому элементу свойства
   * @param {({item: Object<string,*>, name: string, design: string, component: string, properties: Object<string,*>}) => *[]} callback
   * @param {Object.<string,*>} properties
   * @param {{isValue?: boolean}} options
   * @param {string|undefined} design
   * @param {string|undefined} component
   */
  each (
    callback,
    options = {},
    properties = this.properties,
    design = undefined,
    component = undefined
  ) {
    const data = []

    forEach(properties, (item, name) => {
      if (!PropertiesTool.isSpecial(name)) {
        const itemDesign = design || To.kebabCase(name)
        const itemComponent = design ? (component || To.kebabCase(name)) : undefined

        if (!('value' in item)) {
          data.push(...this.each(callback, options, item, itemDesign, itemComponent))
        } else {
          const isObject = typeof item.value === 'object'
          const argumentsFn = {
            item,
            name,
            design: itemDesign,
            component: itemComponent,
            properties
          }

          const value = (!options?.isValue || !isObject) ? callback(argumentsFn) : undefined

          if (isObject) {
            data.push(...this.each(callback, options, item.value, itemDesign, itemComponent))
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

  /**
   * Replacing values ? and ?? with design and component names
   *
   * Изменение значений ? и ?? на названия дизайна и компонента
   * @return {this}
   */
  toFullValue () {
    return this.__toFullValueFix(
      FILE_CACHE_VALUE,
      /(?<=\{)\?/g,
      /(?<=\{)\?\?/g
    )
  }

  /**
   * Replacing values # and ## with design and component names
   *
   * Изменение значений # и ## на названия дизайна и компонента
   * @return {this}
   */
  toFullValueFix () {
    return this.__toFullValueFix(
      FILE_CACHE_VALUE_FIX,
      /(?<=\{)#/g,
      /(?<=\{)##/g
    )
  }

  /**
   * Adds the design name to all values without the design prefix
   *
   * Добавляет название дизайна ко всем значениям без префикса дизайна
   * @return {this}
   */
  toFullValueByDesign () {
    const designs = this.getDesigns()
    const data = this.each(({
      item,
      design,
      component
    }) => {
      let isValue = false

      item.value = item.value
        ?.replace(/(?<=\{)[^.{}]+/, name => {
          if (designs.indexOf(name) === -1) {
            isValue = true
            return `${design}.${name}`
          } else {
            return name
          }
        })

      if (isValue) {
        return {
          item,
          design,
          component
        }
      }
    }, { isValue: true })

    this.cache(FILE_CACHE_VALUE_DESIGN, data)

    return this
  }

  /**
   * Converts special characters to the full path
   *
   * Преобразовывает специальные символы в полный путь
   * @param {string} cache
   * @param {RegExp} designSymbol
   * @param {RegExp} componentSymbol
   * @return {this}
   * @private
   */
  __toFullValueFix (
    cache,
    designSymbol,
    componentSymbol
  ) {
    const data = this.each(({
      item,
      design,
      component
    }) => {
      const isValue = !!item.value?.match(designSymbol)

      if (isValue) {
        if (componentSymbol) {
          item.value = item.value
            .replace(componentSymbol, `${design}.${component}.`)
        }

        item.value = item.value
          .replace(designSymbol, `${design}.`)

        return {
          item,
          design,
          component
        }
      }
    }, { isValue: true })

    this.cache(cache, data)

    return this
  }
}
