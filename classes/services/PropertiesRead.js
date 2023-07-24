const { replaceRecursive } = require('../../functions/data')
const { To } = require('../To')

const PropertiesCache = require('./properties/PropertiesCache')
const PropertiesFiles = require('./properties/PropertiesFiles')
const PropertiesTool = require('./PropertiesTool')

const PropertiesReadImport = require('./PropertiesReadImport')
const PropertiesReadSeparator = require('./PropertiesReadSeparator')
const PropertiesReadStandard = require('./PropertiesReadStandard')

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
   * @param {PropertiesPath} path object of the class for working with paths  объект класса для работы с путями
   * @param {string[]} designs list of design names corresponding to folder names / список
   * названий дизайнов, соответствующих названиям папок
   */
  constructor (
    path,
    designs
  ) {
    this.path = path
    this.designs = designs

    this.fileImport = new PropertiesReadImport()
    this.separator = new PropertiesReadSeparator()
    this.standard = new PropertiesReadStandard()
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

    this.__initCache(FILE_CACHE_READ, data)

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
        const fullPath = [...path, FILE_NAME]
        let properties = PropertiesFiles.readFile(fullPath) || {}

        properties = this.fileImport.to(fullPath, properties)
        properties = this.separator.to(properties)
        properties = this.standard.to({
          [item.design]: properties
        })

        return replaceRecursive(data, properties)
      })
    })

    this.__initCache(FILE_CACHE_MAIN, data)

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
        replaceRecursive(data, this.standard.to({
          [item.design]: {
            [item.component]: {
              [PropertiesTool.getKeyPath()]: item.path,
              ...item.properties
            }
          }
        }))
      }
    })

    this.__initCache(FILE_CACHE_COMPONENTS, data)

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

    this.__initCache(FILE_CACHE_INFORMATION, data)

    return data
  }

  /**
   * Returns the path to a file by design name
   *
   * Возвращает путь к файлу по названию дизайна
   * @param {string} name design name / название дизайна
   * @return {(string[])[]}
   * @private
   */
  __getDesignPath (name) {
    const path = name === 'd' ? 'constructors' : name

    // TODO: Необходимо проверить, правильно ли будет работать путь при подключении модуля
    return [
      [__dirname, '..', '..', path],
      [__dirname, '..', '..', '..', '..', path]
    ]
  }

  /**
   * Getting data
   *
   * Получение данных
   * @param {string} design design name / название дизайна
   * @param {string} paths path to the file / путь к файлу
   * @param {string} name file name / название файла
   * @return {{
   *   design: string,
   *   component: string,
   *   code: string,
   *   path: string,
   *   properties: Object<string,*>
   * }}
   * @private
   */
  __getComponent (design, paths, name) {
    const path = PropertiesFiles.joinPath([...paths, name])

    return {
      design,
      component: To.kebabCase(name),
      code: To.camelCaseFirst(`${design}-${name}`),
      path,
      properties: PropertiesFiles.readFile([path, FILE_NAME]) || {}
    }
  }

  /**
   * Saving the result
   *
   * Сохранение результата
   * @param {string} name file name / название файла
   * @param {Object<string,*>|*[]|string} value values for storage / значения для хранения
   * @private
   */
  __initCache (name, value) {
    PropertiesCache.create(['read', this.designs.join('_')], name, value)
  }
}
