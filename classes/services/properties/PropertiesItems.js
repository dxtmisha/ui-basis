const {
  forEach,
  isObject
} = require('../../../functions/data')
const { To } = require('../../To')

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
   * Returns the name of the property, taking into account the parameter of changing the name
   *
   * Возвращает название свойства, учитывая параметр изменения имени
   * @param {string} name name of property / название свойства
   * @param {Object<string, *>} item object of property / объект свойства
   * @return {*}
   */
  getItemName (name, item) {
    return To.kebabCase(
      (item?.[Keys.rename] || name).replace(/\(.*?$/, '')
    )
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
   * обратного вызова (callback) для каждого элемента
   * @returns {*[]}
   * @private
   */
  each (callback) {
    return this.__each(
      callback
    )
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
   * @return {string}
   */
  toFullLink (design, component, value) {
    if (value.match('?')) {
      return value
        .replace(/\?\?(?![_-])/g, `${design}.${component}.`)
        .replace(/\?\?(?=[_-])/g, `${design}.${component}`)
        .replace(/\?/g, `${design}.`)
    } else {
      return this.toFullLinkByDesign(design, value)
    }
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
