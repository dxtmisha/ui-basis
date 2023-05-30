const { To } = require('../To')

const PropertiesFiles = require('./PropertiesFiles')

const DIR_CACHE = ['..', '..', 'cache']

/**
 * Processing for storing temporary files
 *
 * Обработка для хранения временных файлов
 */
module.exports = class PropertiesCache {
  /**
   * Writing data to a file
   *
   * Запись данных в файл
   * @param {string|string[]} paths
   * @param {string} name
   * @param {Object<string,*>|*[]} value
   * @return {PropertiesFiles}
   */
  static createFile (paths, name, value) {
    PropertiesFiles.createFile(this.getPath(paths), name, value)
    return this
  }

  /**
   * Returns the path to the file
   *
   * Возвращает путь к файлу
   * @param {string|string[]} path
   * @returns {string[]}
   */
  static getPath (path) {
    return [__dirname, ...DIR_CACHE, ...To.array(path)]
  }
}
