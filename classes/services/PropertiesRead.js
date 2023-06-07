const { To } = require('../To')
const {
  forEach,
  isFilled,
  replaceRecursive
} = require('../../functions/data')

const PropertiesCache = require('./PropertiesCache')
const PropertiesFiles = require('./PropertiesFiles')

const FILE_NAME = 'properties.json'
const FILE_CACHE_READ = 'properties-read'
const FILE_CACHE_MAIN = 'properties-main'
const FILE_CACHE_INFORMATION = 'properties-information'
const FILE_CACHE_COMPONENTS = 'properties-components'

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
          design,
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
        return replaceRecursive(data, {
          [item.design]: this.__toStandard(PropertiesFiles.readFile([...path, FILE_NAME]) || {})
        })
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
        replaceRecursive(data, {
          [item.design]: { [item.component]: this.__toStandard(item.properties) }
        })
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
   * @param {string} design
   * @param {string} paths
   * @param {string} name
   * @return {{design: string, component: string, code: string, path: string, properties: Object<string,Object<string,*>>}}
   * @property
   */
  __getComponent (design, paths, name) {
    const path = PropertiesFiles.joinPath([...paths, name])

    return {
      design,
      component: To.camelCase(name),
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

    forEach(properties, (value, name) => {
      if (typeof value !== 'object') {
        data[name] = { value }
      } else if ('value' in value) {
        data[name] = value
      } else if (Object.keys(value).length === 0) {
        data[name] = {}
      } else if (isFilled(value)) {
        data[name] = this.__toStandard(value)
      }
    })

    return data
  }
}
