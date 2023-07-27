const {
  forEach,
  isObject
} = require('../../../functions/data')

const Keys = require('./PropertiesKeys')
const Cache = require('./PropertiesCache')

/**
 * Class for working with a list of all properties
 *
 * Класс для работы со списком всех свойств
 */
module.exports = class PropertiesItems {
  /**
   * Constructor
   * @param {Object<string,*>} properties array with all property records / массив со всеми записями свойств
   */
  constructor (properties) {
    this.properties = properties
    this.designs = Object.keys(properties)
  }

  /**
   * Returns values by index
   *
   * Возвращает значения по индексу
   * @param {string} index index for splitting / индекс для разделения
   * @return {Object<string, *>|undefined}
   */
  getItemByIndex (index) {
    const keys = this.__getKeys(index)
    let item = this.properties?.[keys.shift()]

    if (item) {
      for (const key of keys) {
        item = item?.value?.[key]

        if (!item) {
          console.error('[Items]', `There is no record for the link ${index}`, key, keys)
          break
        }
      }
    }

    return item
  }

  /**
   * Divides an index into sections
   *
   * Разделяет индекс на разделы
   * @param {string} index index for splitting / индекс для разделения
   * @return {string[]}
   * @private
   */
  __getKeys (index) {
    return index.replace(/^\{|}$/ig, '')
      .split('.')
  }

  /**
   * Returns the name of the property, taking into account the parameter of changing the name
   *
   * Возвращает название свойства, учитывая параметр изменения имени
   * @param {string} name name of property / название свойства
   * @param {Object<string, *>} item object of property / объект свойства
   * @return {*}
   */
  getItemName (name, item) {
    return (item?.[Keys.rename] || name).replace(/\(.*?$/, '')
  }

  /**
   * Recursively applies a custom function to each element of the property
   *
   * Рекурсивно применяет пользовательскую функцию к каждому элементу свойства
   * @param {({
   *   design?: string,
   *   component?: string,
   *   name?: string,
   *   value?: *,
   *   item?: Object<string,*>,
   *   parent?: Object<string,*>,
   *   parents?: {name:string, item: Object<string,*>}[]
   * }) => *} callback the callback function is executed for each element / выполняется функция
   * @param {{
   *   design?: string,
   *   component?: string,
   *   name?: string,
   *   value?: *,
   *   item?: Object<string,*>,
   *   parent?: Object<string,*>,
   *   parents?: {name:string, item: Object<string,*>}[]
   * }} property the callback function is executed for each element / выполняется функция
   * обратного вызова (callback) для каждого элемента
   * @returns {*[]}
   * @private
   */
  each (callback, property = undefined) {
    if (property) {
      return this.__each(
        callback,
        property?.design,
        property?.component,
        property?.item?.value,
        property?.item,
        property?.parents
      )
    } else {
      return this.__each(
        callback
      )
    }
  }

  /**
   * Recursively applies a custom function to each element of the property
   *
   * Рекурсивно применяет пользовательскую функцию к каждому элементу свойства
   * @param {({
   *   design?: string,
   *   component?: string,
   *   name?: string,
   *   value?: *,
   *   item?: Object<string,*>,
   *   parent?: Object<string,*>,
   *   parents?: {name:string, item: Object<string,*>}[]
   * }) => *} callback the callback function is executed for each element / выполняется функция
   * @param {string} design design name / название дизайна
   * @param {string} component component name / название компонента
   * @param {Object.<string,*>} properties object for traversal / объект для обхода
   * обратного вызова (callback) для каждого элемента
   * @param {Object.<string,*>|undefined} parent ancestor element / элемент-предок
   * @param {{name:string, item: Object<string,*>}[]} parents list of ancestor names / список названий предков
   * @returns {*[]}
   * @private
   */
  __each (
    callback,
    design = undefined,
    component = undefined,
    properties = this.properties,
    parent = undefined,
    parents = []
  ) {
    const data = []

    forEach(properties, (item, name) => {
      // eslint-disable-next-line n/no-callback-literal
      const value = callback({
        design: design || name,
        component: design && (component || name),
        name,
        value: item?.value,
        item,
        parent,
        parents
      })

      if (value !== undefined) {
        data.push(value)
      }

      if (
        isObject(item?.value) &&
        !Array.isArray(item?.value)
      ) {
        data.push(
          ...this.__each(
            callback,
            design || name,
            design && (component || name),
            item.value,
            item,
            [...parents, {
              name,
              item
            }]
          )
        )
      }
    })

    return data
  }

  /**
   * Replaces labels with design and component names
   *
   * Заменяет метки на названия дизайна и компонента
   * @param {string} design design name / название дизайна
   * @param {string} component component name / название компонента
   * @param {string} value values of properties from the value field / значения свойств из поля value
   * @param {string} separator разделитель
   * @return {string}
   */
  toFullLink (
    design,
    component,
    value,
    separator = '.'
  ) {
    if (value.match(/\?/)) {
      return value
        .replace(/\?\?(?![ _-])/g, `${design}${separator}${component}${separator}`)
        .replace(/\?\?(?=[ _-])/g, `${design}${separator}${component}`)
        .replace(/\?/g, `${design}${separator}`)
    } else {
      return this.toFullLinkByDesign(design, value)
    }
  }

  /**
   * Replaces labels with design and component names (for the name)
   *
   * Заменяет метки на названия дизайна и компонента (для названия)
   * @param {string} design design name / название дизайна
   * @param {string} component component name / название компонента
   * @param {string} value values of properties from the value field / значения свойств из поля value
   * @return {string}
   */
  toFullLinkForName (
    design,
    component,
    value
  ) {
    return this.toFullLink(design, component, value, '-')
  }

  /**
   * Adds the name of the design at the beginning if it is missing
   *
   * Добавляет название дизайна в начало, если его нет
   * @param {string} design design name / название дизайна
   * @param {string} value values of properties from the value field / значения свойств из поля value
   * @returns {string}
   */
  toFullLinkByDesign (design, value) {
    if (value.match('{')) {
      return value?.replace(/(?<=\{)[^.{}]+/g, name => {
        if (this.designs.indexOf(name) === -1) {
          return `${design}.${name}`
        } else {
          return name
        }
      })
    } else {
      return value
    }
  }

  /**
   * Saves intermediate data
   *
   * Сохраняет промежуточные данные
   * @param {string} name file name / название файла
   */
  createStep (name) {
    Cache.createStep(`${this.designs.join('-')}-${name}`, this.properties)
  }
}
