const { getColumn } = require('../../../../functions/data')
const { To } = require('../../../To')

const PropertiesFiles = require('../PropertiesFiles')

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

    // TODO: Необходимо проверить, правильно ли будет работать путь при подключении модуля
    return [
      [__dirname, '..', '..', '..', '..', path],
      [PropertiesFiles.getRoot(), path]
    ]
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
