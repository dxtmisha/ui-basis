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
   * Getting full structure property
   *
   * Получение полной структуры свойства
   * @return {Object<string, *>}
   */
  get () {
    return this.properties
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
   * @param {string} index Index for splitting / Индекс для разделения
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
   * @return {{name: string, property: Object<string,*>}[]}
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
   * @param {string} index Index for splitting / Индекс для разделения
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
   * @param {({
   *   item?: Object<string,*>,
   *   name?: string,
   *   design?: string,
   *   component?: string,
   *   properties?: Object<string,*>,
   *   options?: Object<string,*>,
   *   parents?: {name:string, item: Object<string,*>}[]
   * }) => *} callback The callback function is executed for each element / Выполняется функция
   * обратного вызова (callback) для каждого элемента
   * @param {{isValue?: boolean, options?: Object<string,*>}} options Additional parameters / Дополнительные параметры
   * @param {Object.<string,*>} properties Object for traversal / Объект для обхода
   * @param {Object.<string,*>|undefined} parent Ancestor element / Элемент-предок
   * @param {string|undefined} design Design name / Название дизайна
   * @param {string|undefined} component Component name / Название компонента
   * @param {string[]} parents List of ancestor names / Список названий предков
   * @returns {*[]}
   */
  each (
    callback,
    options = {},
    properties = this.properties,
    parent = undefined,
    design = undefined,
    component = undefined,
    parents = []
  ) {
    const data = []

    if (!('options' in options)) {
      options.options = {}
    }

    forEach(properties, (item, name) => {
      if (!PropertiesTool.isSpecial(name)) {
        const itemDesign = design || To.kebabCase(name)
        const itemComponent = design ? (component || To.kebabCase(name)) : undefined
        const itemParent = {
          name,
          item
        }

        if (!('value' in item)) {
          data.push(
            ...this.each(
              callback,
              options,
              item,
              item,
              itemDesign,
              itemComponent,
              [...parents, itemParent]
            )
          )
        } else {
          const isObject = typeof item.value === 'object'
          const argumentsFn = {
            item,
            name,
            design: itemDesign,
            component: itemComponent,
            properties: parent,
            options: options.options,
            parents
          }

          const value = (!options?.isValue || !isObject) ? callback(argumentsFn) : undefined

          if (isObject) {
            data.push(
              ...this.each(
                callback,
                options,
                item.value,
                item,
                itemDesign,
                itemComponent,
                [...parents, itemParent]
              )
            )
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
   * @param {string} name Cache name / Название кеша
   * @param {Object<string,*>|string} data Data for storage / Данные для хранения
   * @param {string} extension
   * @return {PropertiesItems}
   */
  cache (name, data = this.properties, extension = 'json') {
    PropertiesCache.create([], name, data, extension)

    return this
  }
}
