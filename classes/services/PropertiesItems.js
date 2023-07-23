const {
  forEach,
  getColumn,
  isSelected
} = require('../../functions/data')
const { To } = require('../To')

const PropertiesCache = require('./properties/PropertiesCache')
const PropertiesTool = require('./PropertiesTool')

let step = 10

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
   * @param {Object<string,*>} properties array with all property records / массив со всеми записями свойств
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
   * @param {string} index index for splitting / индекс для разделения
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
   * @param {string} value values to search for / значения, по которым будет производиться поиск
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
   * @param {string} index index for splitting / индекс для разделения
   * @param {boolean} check is this a simple check / является ли это простой проверкой
   * @return {Object<string, *>|undefined}
   */
  getItemByIndex (index, check = false) {
    const keys = this.getKeys(index)
    let data = this.properties

    keys.forEach(key => {
      if (data) {
        key = key.trim()
        data = data?.value?.[key] || data?.[key]
      }
    })

    if (!check && data === undefined) {
      console.error(`PropertiesItems: [no item] ${index}`)
    }

    return data
  }

  /**
   * Returns a list of information about media file list
   *
   * Возвращает список информации о списках медиафайлов
   * @return {Object<string,Object<string,*>>}
   */
  getItemForMedia () {
    const data = {}

    this.findCategory('media')
      .forEach(property => {
        if (typeof property.item?.value === 'object') {
          Object.assign(data, { [property.design]: property.item.value })
        }
      })

    return data
  }

  /**
   * Caching the result
   *
   * Читает результата из кеш
   * @param {string} name cache name / название кеша
   * @param {Function} callback if the file is not found, the callback function is called and
   * its result is saved in the current file / если файл не найден, вызывается функция
   * обратного вызова (callback) и её результат сохраняется в текущем файле
   * @param {string} extension file extension by default is json / расширение файла по умолчанию - json
   * @return {Object<string,*>|string}
   */
  getCache (name, callback, extension = 'json') {
    return PropertiesCache.get([], `${this.getDesigns().join('_')}_${name}`, callback, extension)
  }

  /**
   * Searching for records with selected categories
   *
   * Поиск записей с выделенными категориями
   * @param {string|string[]} category names of categories / названия категорий
   * @return {{
   *   index: string,
   *   name: string,
   *   parents: Object<string,*>,
   *   item: Object<string,*>,
   *   design: string
   * }[]}
   */
  findCategory (category) {
    const key = PropertiesTool.getKeyCategory()
    const data = []

    this.each(({
      item,
      name,
      parents,
      design
    }) => {
      if (isSelected(item?.[key], category)) {
        data.push({
          index: `${getColumn(parents, 'name').join('.')}.${name}`,
          name,
          parents,
          item,
          design
        })
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
   * }) => *} callback the callback function is executed for each element / выполняется функция
   * обратного вызова (callback) для каждого элемента
   * @param {{isValue?: boolean, options?: Object<string,*>}} options additional parameters / дополнительные параметры
   * @param {Object.<string,*>} properties object for traversal / объект для обхода
   * @param {Object.<string,*>|undefined} parent ancestor element / элемент-предок
   * @param {string|undefined} design design name / название дизайна
   * @param {string|undefined} component component name / название компонента
   * @param {{name:string, item: Object<string,*>}[]} parents list of ancestor names / список названий предков
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
   * @param {string} name cache name / название кеша
   * @param {Object<string,*>|string} data data for storage / данные для хранения
   * @param {string} extension file extension by default is json / расширение файла по умолчанию - json
   * @return {PropertiesItems}
   */
  cache (name, data = this.properties, extension = 'json') {
    PropertiesCache.create(['step', this.getDesigns().join('_')], `step--${step++}__${name}`, data, extension)

    return this
  }
}
