const {
  replaceRecursive,
  forEach,
  isFilled
} = require('../../functions/data')
const { To } = require('../To')

const PropertiesCache = require('./PropertiesCache')
const PropertiesFiles = require('./PropertiesFiles')
const PropertiesVariable = require('./PropertiesVariable')

const FILE_NAME = 'properties.json'

const FILE_PROPERTIES = 'properties'
const FILE_MAIN = 'main'
const FILE_MAIN_PROPERTIES_ALL = 'main-properties-all'
const FILE_COMPONENT_INFO = 'components-info'
const FILE_COMPONENT_PROPERTIES = 'components-properties'

/**
 * Class for working with file content
 *
 * Класс для работы с содержимым файла
 */
module.exports = class PropertiesStructure {
  designsCache = []
  properties = undefined

  /**
   * @param {string[]} designs
   * @param {boolean} cache
   */
  constructor (designs, cache = true) {
    this.designs = ['d', ...designs]
    this.cache = cache
  }

  /**
   * Getting the complete processed list
   *
   * Получение полного обработанного списка
   * @return {Object<string, *>}
   */
  get () {
    return this.__getByCache(FILE_PROPERTIES, () => {
      const data = this.__getProperties()

      this.__toLink(data)

      return data
    })
  }

  /**
   * Возвращает полную ссылку на директорию дизайна
   *
   * Returns the full link to the design directory
   * @returns {{design:string,paths:string[]}[]}
   */
  getFullPath () {
    if (this.designsCache.length > 0) {
      return this.designsCache
    } else if (Array.isArray(this.designs)) {
      this.designs.forEach(design => {
        this.designsCache.push({
          design,
          paths: [
            [__dirname, '..', '..', this.__getDesignPath(design)],
            [__dirname, '..', '..', '..', '..', this.__getDesignPath(design)]
          ]
        })
      })

      return this.designsCache
    } else {
      return []
    }
  }

  /**
   * Returns all main tokens
   *
   * Возвращает все основные токены
   * @return {{design: string, properties: Object<string,*>}[]}
   */
  getMain () {
    return this.__getByCache(FILE_MAIN, () => {
      const list = this.getFullPath()
      const data = []

      list.forEach(item => {
        const properties = {}

        item.paths.forEach(
          path => replaceRecursive(properties, PropertiesFiles.readFile([...path, FILE_NAME]) || {})
        )

        data.push({
          design: item.design,
          properties: this.__toStandard(properties)
        })
      })

      return data
    })
  }

  /**
   * Returns the main property
   *
   * Возвращает основное свойство
   * @return {Object<string, *>}
   */
  getMainProperties () {
    const main = this.getMain()
    const data = {}

    main.forEach(item => {
      data[item.design] = item.properties
    })

    return data
  }

  /**
   * Returns a complete list of properties from all locations
   *
   * Возвращает полный список свойств со всех мест
   * @return {Object<string, *>}
   */
  getMainAll () {
    return this.__getByCache(FILE_MAIN_PROPERTIES_ALL, () => {
      const main = this.getMainProperties()
      const components = this.getComponentsProperties()

      return replaceRecursive(components, main)
    })
  }

  /**
   * Returns information about the component
   *
   * Возвращает информацию об компоненте
   * @return {{design: string, name: string, code: string, path: string, isProperty: boolean}[]}
   */
  getComponents () {
    return this.__getByCache(FILE_COMPONENT_INFO, () => {
      const list = this.getFullPath()
      const data = []

      list.forEach(item => {
        item.paths.forEach(path => {
          const dirs = PropertiesFiles.readDir(path)

          dirs.forEach(dir => {
            if (PropertiesFiles.isDir(dir)) {
              data.push(this.__getComponent(item.design, path, dir))
            }
          })
        })
      })

      return data
    })
  }

  /**
   * Returns a list of basic properties of the component
   *
   * Возвращает список базовых свойств компоненты
   * @return {Object<string, *>}
   */
  getComponentsProperties () {
    return this.__getByCache(FILE_COMPONENT_PROPERTIES, () => {
      const info = this.getComponents()
      const data = {}

      info.forEach(component => {
        if (component.isProperty) {
          replaceRecursive(data, this.__getComponentProperties(component))
        }
      })

      return data
    })
  }

  /**
   * Checks if there is a link in the child elements
   *
   * Проверяет, есть ли ссылка у дочерних элементов
   * @param {Object<string,*>} properties
   * @return {boolean}
   * @private
   */
  __isLinkForProperties (properties) {
    let is = false

    forEach(properties, item => {
      if (!is) {
        switch (item?.[PropertiesVariable.getVariableName()]) {
          case 'link':
            is = true

            break
          case 'var':
            break
          default:
            is = this.__isLinkForProperties(item)
            break
        }
      }
    })

    return is
  }

  /**
   * Returns caching information
   *
   * Возвращает информацию по кэшированию
   * @param {string} name
   * @param {Function} callback
   * @param {string[]} paths
   * @return {Object<string, *>|*[]}
   * @private
   */
  __getByCache (name, callback, paths = []) {
    if (this.cache) {
      return PropertiesCache.get(paths, name, () => callback())
    } else {
      return callback()
    }
  }

  /**
   * Returns the path to a file by design name
   *
   * Возвращает путь к файлу по названию дизайна
   * @param {string} name Design name / Название дизайна
   * @return {string}
   * @private
   */
  __getDesignPath (name) {
    return name === 'd' ? 'constructors' : name
  }

  /**
   * Returns all records of the link type
   *
   * Возвращает все записи типа ссылка
   * @param {Object<string,*>} properties
   * @param {string} design
   * @param {string} component
   * @return {{name:string,design:string,component:string,link:string,item:Object<string,*>,properties:Object<string,*>,edit:boolean}[]}
   * @private
   */
  __getLinkForProperties (
    properties,
    design = undefined,
    component = undefined
  ) {
    const data = []

    forEach(properties, (item, name) => {
      const itemDesign = design || name
      const itemComponent = design ? (component || name) : undefined

      switch (item?.[PropertiesVariable.getVariableName()]) {
        case 'link':
          data.push({
            name,
            design: itemDesign,
            component: itemComponent,
            link: item.value,
            item,
            properties,
            edit: false
          })

          break
        case 'var':
          break
        default:
          data.push(...this.__getLinkForProperties(item, itemDesign, itemComponent))
          break
      }
    })

    return data
  }

  /**
   * Getting data
   *
   * Получение данных
   * @param {string} design
   * @param {string} paths
   * @param {string} name
   * @return {{design: string, name: string, code: string, path: string, isProperty: boolean}}
   * @property
   */
  __getComponent (design, paths, name) {
    const path = PropertiesFiles.joinPath([...paths, name])

    return {
      design,
      name: To.camelCase(name),
      code: To.camelCaseFirst(`${design}-${name}`),
      path,
      isProperty: PropertiesFiles.is([path, FILE_NAME])
    }
  }

  /**
   * Returns content from the file by property
   *
   * Возвращает содержимое из файла по свойству
   * @param {{design: string, name: string, code: string, path: string, isProperty: boolean}} component
   * @return {Object<string, *>}
   * @private
   */
  __getComponentProperties (component) {
    return {
      [component.design]: {
        [component.name]: this.__toStandard(
          PropertiesFiles.readFile([component.path, FILE_NAME])
        )
      }
    }
  }

  /**
   * Useful record for processing
   *
   * Полезная запись для обработки
   * @return {Object<string, *>}
   * @private
   */
  __getProperties () {
    if (!this.properties) {
      this.properties = this.getMainAll() || {}
    }

    return this.properties
  }

  /**
   * Getting data by reference
   *
   * Получение данных по ссылке
   * @param {string[]} paths
   * @return {Object<string, *>|undefined}
   * @private
   */
  __getProperty (paths) {
    let data = this.__getProperties()
    let find = true

    paths.forEach(path => {
      if (path in data) {
        data = data[path]
      } else {
        find = false
      }
    })

    if (find) {
      return data
    } else {
      return undefined
    }
  }

  /**
   * Transforms an array into the required data structure
   *
   * Преобразует массив в нужную структуру
   * @param {Object<string,string|Object<string,string>>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @return {Object<string,Object<string,*>>}
   * @private
   */
  __toStandard (properties) {
    const data = {}

    forEach(properties, (value, key) => {
      const name = To.kebabCase(key)
      let item = {}

      if (typeof value !== 'object') {
        item.value = value
      } else if ('value' in value) {
        item = value
      } else if (Object.keys(value).length === 0) {
        item = PropertiesVariable.getNone()
      } else if (isFilled(value)) {
        item = this.__toStandard(value)
      }

      data[name] = PropertiesVariable.init(name, item)
    })

    return data
  }

  /**
   * Updating all links
   *
   * Обновление всех ссылок
   * @param {Object<string,Object<string,*>>} properties
   * @private
   */
  __toLink (properties) {
    const data = this.__getLinkForProperties(properties)
    let max = 100
    let update = true

    while (update && max-- > 0) {
      update = false

      data.forEach(item => {
        if (
          !item.edit &&
          this.__addDateByLink(item)
        ) {
          update = true
          item.edit = true
        }
      })
    }
  }

  /**
   * Adding a property by reference
   *
   * Добавление свойства по ссылке
   * @param {{name:string,design:string,component:string,link:string,item:Object<string,*>,properties:Object<string,*>,edit:boolean}} item
   * @return {boolean}
   * @private
   */
  __addDateByLink (item) {
    const paths = PropertiesVariable.getLinkByStandard(
      item.link,
      item.design,
      item.component
    )

    const properties = this.__getProperty(paths)

    if (properties && !this.__isLinkForProperties(properties)) {
      forEach(properties, (property, name) => {
        if (!PropertiesVariable.isSpecialist(name)) {
          item.properties[name] = property
        }
      })

      delete item.properties[item.name]
      return true
    } else {
      return false
    }
  }
}
