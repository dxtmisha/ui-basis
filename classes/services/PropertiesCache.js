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
   * Checks if there are files to read
   *
   * Проверяет наличие файлов для чтения
   * @param {string|string[]} paths
   * @param {string} name
   * @return {boolean}
   */
  static is (paths, name) {
    return PropertiesFiles.is(this.__getPath([...paths, PropertiesFiles.getFileName(name)]))
  }

  /**
   * Reads the content of the file
   *
   * Читает содержимое файла
   * @param {string|string[]} paths
   * @param {string} name
   * @param {Function} callback
   * @return {Object<string, *>|*[]}
   */
  static get (paths, name, callback = undefined) {
    if (this.is(paths, name)) {
      const path = this.__getPath([...To.array(paths), PropertiesFiles.getFileName(name)])
      return PropertiesFiles.readFile(path)
    } else if (callback) {
      this.create(paths, name, callback())
      return this.get(paths, name)
    } else {
      return {}
    }
  }

  /**
   * Writing data to a file
   *
   * Запись данных в файл
   * @param {string|string[]} paths
   * @param {string} name
   * @param {Object<string,*>|*[]} value
   * @return {PropertiesFiles}
   */
  static create (paths, name, value) {
    PropertiesFiles.createFile(this.__getPath(paths), name, value)
    return this
  }

  /**
   * Returns the path to the file
   *
   * Возвращает путь к файлу
   * @param {string|string[]} path
   * @returns {string[]}
   * @private
   */
  static __getPath (path) {
    return [__dirname, ...DIR_CACHE, ...To.array(path)]
  }
}
