const { To } = require('../To')
const {
  forEach,
  isFilled,
  replaceRecursive
} = require('../../functions/data')

const PropertiesCache = require('./PropertiesCache')
const PropertiesFiles = require('./PropertiesFiles')
const PropertiesTool = require('./PropertiesTool')

const FILE_NAME = 'properties.json'
const FILE_CACHE_READ = 'properties-read'
const FILE_CACHE_MAIN = 'properties-read-main'
const FILE_CACHE_INFORMATION = 'properties-read-information'
const FILE_CACHE_COMPONENTS = 'properties-read-components'

/**
 * Reading all files and returning a merged object
 *
 * Чтение всех файлов и возвращение объединенного объекта
 */
module.exports = class PropertiesRead {
  designsPaths = []

  /**
   * @param {string[]} designs
   */
  constructor (designs) {
    this.designs = ['d', ...designs]
  }

  /**
   * Returns a complete list of properties from all locations
   *
   * Возвращает полный список свойств со всех мест
   * @return {Object<string, *>}
   */
  get () {
    const main = this.getMain()
    const components = this.getComponents()
    const data = replaceRecursive(components, main)

    PropertiesCache.create([], FILE_CACHE_READ, data)

    return data
  }

  /**
   * Возвращает полную ссылку на директорию дизайна
   *
   * Returns the full link to the design directory
   * @returns {{design:string,paths:string[]}[]}
   */
  getFullPath () {
    if (this.designsPaths.length > 0) {
      return this.designsPaths
    } else if (Array.isArray(this.designs)) {
      this.designs.forEach(design => {
        this.designsPaths.push({
          design: To.kebabCase(design),
          paths: this.__getDesignPath(design)
        })
      })

      return this.designsPaths
    } else {
      return []
    }
  }

  /**
   * Returns all main tokens
   *
   * Возвращает все основные токены
   * @return {Object<string,*>}
   */
  getMain () {
    const list = this.getFullPath()
    const data = {}

    list.forEach(item => {
      return item.paths.forEach(path => {
        return replaceRecursive(data, this.__toStandard({
          [item.design]: PropertiesFiles.readFile([...path, FILE_NAME]) || {}
        }))
      })
    })

    PropertiesCache.create([], FILE_CACHE_MAIN, data)

    return data
  }

  /**
   * Returns a list of basic properties of the component
   *
   * Возвращает список базовых свойств компоненты
   * @return {Object<string, *>}
   */
  getComponents () {
    const info = this.getComponentsInfo()
    const data = {}

    info.forEach(item => {
      if (item.properties) {
        replaceRecursive(data, this.__toStandard({
          [item.design]: { [item.component]: item.properties }
        }))
      }
    })

    PropertiesCache.create([], FILE_CACHE_COMPONENTS, data)

    return data
  }

  /**
   * Returns information about the component
   *
   * Возвращает информацию об компоненте
   * @return {{design: string, component: string, code: string, path: string, properties: Object<string,*>}[]}
   */
  getComponentsInfo () {
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

    PropertiesCache.create([], FILE_CACHE_INFORMATION, data)

    return data
  }

  /**
   * Returns the path to a file by design name
   *
   * Возвращает путь к файлу по названию дизайна
   * @param {string} name Design name / Название дизайна
   * @return {(string[])[]}
   * @private
   */
  __getDesignPath (name) {
    const path = name === 'd' ? 'constructors' : name

    return [
      [__dirname, '..', '..', path],
      [__dirname, '..', '..', '..', '..', path]
    ]
  }

  /**
   * Getting data
   *
   * Получение данных
   * @param {string} design Design name / Название дизайна
   * @param {string} paths Path to the file / Путь к файлу
   * @param {string} name File name / Название файла
   * @return {{
   *   design: string,
   *   component: string,
   *   code: string,
   *   path: string,
   *   properties: Object<string,Object<string,*>>
   * }}
   * @property
   */
  __getComponent (design, paths, name) {
    const path = PropertiesFiles.joinPath([...paths, name])

    return {
      design,
      component: To.kebabCase(name),
      code: To.camelCaseFirst(`${design}-${name}`),
      path,
      properties: this.__toStandard(PropertiesFiles.readFile([path, FILE_NAME]) || {})
    }
  }

  /**
   * Transforms an array into the required data structure
   *
   * Преобразует массив в нужную структуру
   * @param {Object<string,*>|{}} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @return {Object<string,Object<string,*>>}
   * @private
   */
  __toStandard (properties) {
    const data = {}

    forEach(properties, (item, name) => {
      const key = PropertiesTool.getName(name)
      const variable = PropertiesTool.getVariableInName(name)
      const value = this.__toStandardByItem(item, key)

      if (key in data) {
        data[key] = replaceRecursive(data[key], value)
      } else {
        data[key] = value
      }

      if (variable) {
        data[key][PropertiesTool.getKeyVariable()] = variable
      }
    })

    return data
  }

  /**
   * Transform the property value into the required format
   *
   * Преобразовать значение свойства в необходимый формат
   * @param {Object<string, *>|string|number} value Values for conversion / Значения для преобразования
   * @param {string} name Property name / Название свойства
   * @return {Object<string, *>}
   * @private
   */
  __toStandardByItem (value, name) {
    if (PropertiesTool.isSpecial(name)) {
      return value
    } else if (typeof value !== 'object') {
      return { value }
    } else if ('value' in value) {
      if (typeof value.value === 'object') {
        return {
          ...value,
          value: this.__toStandard(value.value)
        }
      } else {
        return value
      }
    } else if (Object.keys(value).length === 0) {
      return { value: {} }
    } else if (isFilled(value)) {
      return this.__toSeparate(this.__toStandard(value))
    } else {
      return { value: {} }
    }
  }

  /**
   * Separate a special property from regular values
   *
   * Разделить специальное свойство от обычных значений
   * @param {Object<string,*>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @return {Object<string,*>}
   * @private
   */
  __toSeparate (properties) {
    const value = {}
    const special = {}

    forEach(this.__toStandard(properties), (item, name) => {
      if (PropertiesTool.isSpecial(name)) {
        special[name] = item
      } else {
        value[name] = item
      }
    })

    return {
      value,
      ...special
    }
  }
}
