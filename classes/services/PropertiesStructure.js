const { To } = require('../To')

const PropertiesCache = require('./PropertiesCache')
const PropertiesFiles = require('./PropertiesFiles')

const FILE_NAME = 'properties.json'
const FILE_COMPONENT_INFO = 'components-info'
const FILE_COMPONENT_PROPERTIES = 'components-properties'

/**
 * Class for working with file content
 *
 * Класс для работы с содержимым файла
 */
module.exports = class PropertiesStructure {
  constructor (designs, cache = true) {
    this.designs = designs
    this.cache = cache
  }

  /**
   * Возвращает полную ссылку на директорию дизайна
   *
   * Returns the full link to the design directory
   * @returns {{design:string,paths:string[]}[]}
   */
  getFullPath () {
    if (Array.isArray(this.designs)) {
      const designs = []

      this.designs.forEach(design => {
        designs.push({
          design,
          paths: [
            [__dirname, '..', '..', design],
            [__dirname, '..', '..', '..', '..', design]
          ]
        })
      })

      return designs
    } else {
      return []
    }
  }

  /**
   * Returns information about the component
   *
   * Возвращает информацию об компоненте
   * @return {{design: string, name: string, code: string, path: string, isProperty: boolean}[]}
   */
  getComponentsInfo () {
    return this.__getByCache(FILE_COMPONENT_INFO, () => {
      const list = this.getFullPath()
      const data = []

      list.forEach(item => {
        item.paths.forEach(path => {
          const dirs = PropertiesFiles.readDir(path)

          dirs.forEach(dir => {
            if (PropertiesFiles.isDir(dir)) {
              data.push(this.__getComponentInfo(item.design, path, dir))
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
   * @return {{design: string, name: string, properties: Object<string, *>}[]}
   */
  getComponentsProperties () {
    return this.__getByCache(FILE_COMPONENT_PROPERTIES, () => {
      const info = this.getComponentsInfo()
      const data = []

      info.forEach(component => {
        if (component.isProperty) {
          data.push(this.__getComponentProperties(component))
        }
      })

      return data
    })
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
   * Getting data
   *
   * Получение данных
   * @param {string} design
   * @param {string} paths
   * @param {string} name
   * @return {{design: string, name: string, code: string, path: string, isProperty: boolean}}
   * @property
   */
  __getComponentInfo (design, paths, name) {
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
   * @return {{design: string, name: string, properties: Object<string, *>}}
   * @private
   */
  __getComponentProperties (component) {
    return {
      design: component.design,
      name: component.name,
      properties: {
        [component.design]: {
          [component.name]: PropertiesFiles.readFile([component.path, FILE_NAME])
        }
      }
    }
  }
}
