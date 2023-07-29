const {
  forEach,
  getColumn,
  isObject,
  isSelected
} = require('../../../functions/data')

const Cache = require('./PropertiesCache')
const Category = require('./PropertiesCategory')
const Keys = require('./PropertiesKeys')
const Type = require('./PropertiesType')

const SUPPORT_NAME = [
  Type.design,
  Type.component,
  Type.classType
]

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
    return this.designs
  }

  /**
   * Divides an index into sections
   *
   * Разделяет индекс на разделы
   * @param {string} index index for splitting / индекс для разделения
   * @return {string[]}
   * @private
   */
  getKeys (index) {
    return index.replace(/^\{|}$/ig, '')
      .split('.')
  }

  /**
   * Returns the full information about the element by its link
   *
   * Возвращает полную информацию об элементе по его ссылке
   * @param {string} index index for splitting / индекс для разделения
   * @return {{
   *   design?: string,
   *   component?: string,
   *   name: string,
   *   value: *,
   *   item: Object<string,*>,
   *   parent?: Object<string,*>,
   *   parents: {name:string, item: Object<string,*>}[]
   * }|undefined}
   */
  getFullItemByIndex (index) {
    const keys = this.getKeys(index)
    const design = keys.shift()
    const component = keys.shift()
    const parents = [
      {
        name: design,
        item: this.properties?.[design]
      }
    ]

    let name = component
    let item = this.properties?.[design]?.value?.[component]
    let parent = parents[0].item

    if (item) {
      for (const key of keys) {
        parents.push({
          name: key,
          item
        })

        parent = item

        name = key
        item = item?.value?.[key]

        if (!item) {
          break
        }
      }
    }

    if (item) {
      return {
        design,
        component,
        name,
        item,
        value: item?.value,
        parent,
        parents
      }
    } else {
      return undefined
    }
  }

  /**
   * Returns values by index
   *
   * Возвращает значения по индексу
   * @param {string} index index for splitting / индекс для разделения
   * @return {Object<string, *>|undefined}
   */
  getItemByIndex (index) {
    const item = this.getFullItemByIndex(index)?.item

    if (!item) {
      console.error('[Items]', `No record: ${index}`)
    }

    return item
  }

  /**
   * Returns the used name
   *
   * Возвращает использованное имя
   * @param {string} name name of property / название свойства
   * @param {Object<string, *>} item object of property / объект свойства
   * @return {*}
   */
  getItemReName (name, item) {
    return item?.[Keys.rename] || name
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
    return this.getItemReName(name, item).replace(/\(.*?$/, '')
  }

  /**
   * Returns ancestor names
   *
   * Возвращает имена предков
   * @param {{name:string,item:Object<string,*>}[]} parents array of all ancestor properties
   * along the tree from the top level / массив со всеми свойствами предков по дереву от верхнего уровня
   * @param {string[]} variable list of types to exclude, such types are ignored / список типов
   * для исключения, такие типы игнорируются
   * @return {string[]}
   */
  getParentsName (parents, variable = undefined) {
    return forEach(parents, ({
      name,
      item
    }) => {
      if (
        !variable ||
        variable.indexOf(item?.[Keys.variable]) !== -1 ||
        SUPPORT_NAME.indexOf(item?.[Keys.variable]) !== -1
      ) {
        return name
      }

      return undefined
    }, true)
  }

  /**
   * Returns a list of information about media file list
   *
   * Возвращает список информации о списках медиафайлов
   * @return {Object<string,Object<string,*>>}
   */
  getItemForMedia () {
    const data = {}

    this.findCategory(Category.media)
      .forEach(({
        design,
        item
      }) => {
        if (typeof item?.value === 'object') {
          Object.assign(data, { [design]: item.value })
        }
      })

    return data
  }

  /**
   * Recursively applies a custom function to each element of the property
   *
   * Рекурсивно применяет пользовательскую функцию к каждому элементу свойства
   * @param {({
   *   design?: string,
   *   component?: string,
   *   name: string,
   *   value: *,
   *   item: Object<string,*>,
   *   parent?: Object<string,*>,
   *   parents: {name:string, item: Object<string,*>}[]
   * }) => *} callback the callback function is executed for each element / выполняется функция
   * @param {{
   *   design?: string,
   *   component?: string,
   *   name: string,
   *   value: *,
   *   item: Object<string,*>,
   *   parent?: Object<string,*>,
   *   parents: {name:string, item: Object<string,*>}[]
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
   *   name: string,
   *   value: *,
   *   item: Object<string,*>,
   *   parent?: Object<string,*>,
   *   parents: {name:string, item: Object<string,*>}[]
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
   * Searching for records with selected categories
   *
   * Поиск записей с выделенными категориями
   * @param {string|string[]} category names of categories / названия категорий
   * @return {{
   *   design?: string,
   *   component?: string,
   *   name: string,
   *   value: *,
   *   item: Object<string,*>,
   *   parent?: Object<string,*>,
   *   parents: {name:string, item: Object<string,*>}[]
   * }[]}
   */
  findCategory (category) {
    const data = []

    this.each((property) => {
      const {
        item
      } = property

      if (isSelected(item?.[Keys.category], category)) {
        data.push(this.__getFullInfo(property))
      }
    })

    return data
  }

  /**
   * Searching for records with selected categories
   *
   * Поиск записей с выделенными категориями
   * @param {string|string[]} variable names of categories / названия категорий
   * @return {{
   *   design?: string,
   *   component?: string,
   *   name: string,
   *   value: *,
   *   item: Object<string,*>,
   *   parent?: Object<string,*>,
   *   parents: {name:string, item: Object<string,*>}[],
   *   index: string
   * }[]}
   */
  findVariable (variable) {
    const data = []

    this.each(property => {
      const {
        item
      } = property

      if (isSelected(item?.[Keys.variable], variable)) {
        data.push(this.__getFullInfo(property))
      }
    })

    return data
  }

  /**
   * Returns complete information about the property
   *
   * Возвращает полную информацию о свойстве
   * @param {{
   *   design?: string,
   *   component?: string,
   *   name: string,
   *   value: *,
   *   item: Object<string,*>,
   *   parent?: Object<string,*>,
   *   parents: {name:string, item: Object<string,*>}[]
   * }} property an object with information about properties / объект с информацией о свойствах
   * @return {{
   *   design?: string,
   *   component?: string,
   *   name: string,
   *   value: *,
   *   item: Object<string,*>,
   *   parent?: Object<string,*>,
   *   parents: {name:string, item: Object<string,*>}[],
   *   index: string
   * }}
   * @private
   */
  __getFullInfo (property) {
    return {
      ...property,
      index: `${getColumn(property.parents, 'name').join('.')}.${property.name}`
    }
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
