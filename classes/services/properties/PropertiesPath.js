const {
  getColumn,
  forEach,
  replaceRecursive
} = require('../../../functions/data')
const { To } = require('../../To')

const Files = require('./PropertiesFiles')
const Cache = require('./PropertiesCache')

const DIR_CACHE = 'read'
const FILE_NAME = 'properties.json'

/**
 * Class for working with paths by the given name of the design
 *
 * Класс для работы с путями по заданному названию дизайна
 */
module.exports = class PropertiesPath {
  /**
   * Constructor
   * @param {string|string[]} designs list of design names corresponding to folder names / список
   * названий дизайнов, соответствующих названиям папок
   */
  constructor (designs) {
    /**
     * @type {{design: string, paths: string[]}[]}
     */
    this.items = this.__init(designs)
  }

  /**
   * Returns the full link to the design directory
   *
   * Возвращает полную ссылку на директорию дизайна
   * @return {{design: string, paths: string[]}[]}
   */
  get () {
    return this.items
  }

  /**
   * Returns the names of available designs
   *
   * Возвращает названия доступных дизайнов
   * @return {string[]}
   */
  getDesigns () {
    return getColumn(this.items, 'design')
  }

  /**
   * Returns the names of available designs as a string
   *
   * Возвращает названия доступных дизайнов в виде строки
   * @return {string}
   */
  getDesignsToString () {
    return this.getDesigns().join(',')
  }

  /**
   * Gets a list of available paths to the file of global component settings
   *
   * Получает список доступных путей к файлу глобальных настроек компонента
   * @param {string} name design name / название дизайна
   * @return {{
   *   dir: string[],
   *   file: string[]
   * }[]}
   */
  getPathsProperties (name) {
    return forEach(
      this.items.find(item => item.design === name)?.paths,
      path => {
        return {
          dir: path,
          file: [...path, this.getFileName()]
        }
      }
    )
  }

  /**
   * Processes all token values for all designs and combines them into one-big array
   *
   * Обрабатывает все значения токена у всех дизайнов и соединяет их в одну-большую массива
   * @param {string} name name of the group / названия группы
   * @param {(error:*, item:{
   *   design: string,
   *   path: {
   *     dir: string[],
   *     file: string[]
   *   }
   * }) => Object<string,*>} callback function for processing / функция для обработки
   * @return {Object<string,*>}
   */
  applyToDesignAll (name, callback) {
    return Cache.get([DIR_CACHE], `${name}`, () => {
      const data = {}

      this.getDesigns().forEach(
        design => replaceRecursive(data, this.applyToDesign(name, design, callback))
      )

      return data
    })
  }

  /**
   * Processes all token values for the selected design and combines them into one-big array
   *
   * Обрабатывает все значения токена у выбранного дизайна и соединяет их в одну-большую массива
   * @param {string} name name of the group / названия группы
   * @param {string} design design name / название дизайна
   * @param {(error:*, item:{
   *   design: string,
   *   path: {
   *     dir: string[],
   *     file: string[]
   *   }
   * }) => Object<string,*>} callback function for processing / функция для обработки
   * @return {Object<string, *>}
   */
  applyToDesign (name, design, callback) {
    return Cache.get([DIR_CACHE, name], `${name}-${design}`, () => {
      const data = {}

      this.getPathsProperties(design).forEach(
        path => replaceRecursive(data, callback(null, {
          design,
          path
        }))
      )

      return data
    })
  }

  /**
   * Returns the name of the file, in which the basic values for working with tokens are stored
   *
   * Возвращает название файла, в котором сохранены базовые значения для работы с токенами
   * @return {string}
   */
  getFileName () {
    return FILE_NAME
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

    if (Files.isModule()) {
      return [
        [__dirname, '..', '..', '..', path],
        [Files.getRoot(), path],
        [Files.getRoot(), 'src', 'components', path]
      ]
    } else {
      return [
        [Files.getRoot(), path]
      ]
    }
  }

  /**
   * Инициализирует данный с путями для дизайна
   * @param {string|string[]} designs list of design names corresponding to folder names / список
   * названий дизайнов, соответствующих названиям папок
   * @return {{design: string, paths: string[]}[]}
   * @private
   */
  __init (designs) {
    const items = []

    To.array(designs).forEach(design => {
      items.push({
        design: To.kebabCase(design),
        paths: this.__getDesignPath(design)
      })
    })

    return items
  }
}
