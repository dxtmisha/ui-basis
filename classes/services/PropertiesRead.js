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
   * @param {string[]} designs list of design names corresponding to folder names / список
   * названий дизайнов, соответствующих названиям папок
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
          [item.design]: {
            [item.component]: {
              [PropertiesTool.getKeyPath()]: item.path,
              ...item.properties
            }
          }
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
   *   properties: Object<string,Object<string,*>>
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
      properties: this.__toStandard(PropertiesFiles.readFile([path, FILE_NAME]) || {})
    }
  }

  /**
   * Transforms an array into the required data structure
   *
   * Преобразует массив в нужную структуру
   * @param {Object<string,*>|{}} properties an array that needs to be
   * transformed / массив, который нужно преобразовать
   * @return {Object<string,Object<string,*>>}
   * @private
   */
  __toStandard (properties) {
    const keyVariable = PropertiesTool.getKeyVariable()
    const data = {}

    forEach(properties, (item, name) => {
      const key = PropertiesTool.getName(name)
      const variable = PropertiesTool.getVariableInName(name)
      const value = this.__toStandardByItem(item, key)
      const newKey = this.__reKeyName(key, variable || value?.[keyVariable])

      if (newKey in data) {
        data[newKey] = replaceRecursive(data[newKey], value)
      } else {
        data[newKey] = value
      }

      if (variable) {
        data[newKey][keyVariable] = variable
      }

      if (PropertiesTool.isFull(name)) {
        data[newKey][PropertiesTool.getKeyFull()] = true
      }
    })

    return data
  }

  /**
   * Returns a new key
   *
   * Возвращает новый ключ
   * @param {string} key property name / название свойства
   * @param {string|undefined} variable тип свойство
   * @return {string}
   * @private
   */
  __reKeyName (key, variable) {
    switch (variable) {
      case 'media':
      case 'media-max':
        if (!key.match(/^media-/)) {
          return `media-${key}`
        }
        break
    }

    return key
  }

  /**
   * Transform the property value into the required format
   *
   * Преобразовать значение свойства в необходимый формат
   * @param {Object<string, *>|string|number} value values for conversion / значения для преобразования
   * @param {string} name property name / название свойства
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
