const { To } = require('../To')

const PropertiesFiles = require('./PropertiesFiles')

const CACHE_STATUS = false
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
   * @param {string|string[]} paths Path to the file / Путь к файлу
   * @param {string} name File name / Название файла
   * @param {string} extension
   * @return {boolean}
   */
  static is (paths, name, extension = 'json') {
    return PropertiesFiles.is(this.__getPath([...paths, PropertiesFiles.getFileName(name, extension)]))
  }

  /**
   * Reads the content of the file
   *
   * Читает содержимое файла
   * @param {string|string[]} paths Path to the file / Путь к файлу
   * @param {string} name File name / Название файла
   * @param {Function} callback If the file is not found, the callback function is called and
   * its result is saved in the current file / Если файл не найден, вызывается функция
   * обратного вызова (callback) и её результат сохраняется в текущем файле
   * @param {string} extension
   * @return {Object<string, *>|*[]|string}
   */
  static get (
    paths,
    name,
    callback = undefined,
    extension = 'json'
  ) {
    if (CACHE_STATUS && this.is(paths, name, extension)) {
      const path = this.__getPath([...To.array(paths), PropertiesFiles.getFileName(name, extension)])
      return PropertiesFiles.readFile(path)
    } else if (callback) {
      const value = callback()
      this.create(paths, name, value, extension)
      return value
    } else {
      return {}
    }
  }

  /**
   * Writing data to a file
   *
   * Запись данных в файл
   * @param {string|string[]} paths Path to the file / Путь к файлу
   * @param {string} name File name / Название файла
   * @param {Object<string,*>|*[]|string} value Values for storage / Значения для хранения
   * @param {string} extension
   * @return {PropertiesFiles}
   */
  static create (
    paths,
    name,
    value,
    extension = 'json'
  ) {
    PropertiesFiles.createFile(this.__getPath(paths), name, value, extension)
    return this
  }

  /**
   * Returns the path to the file
   *
   * Возвращает путь к файлу
   * @param {string|string[]} path Path to the file / Путь к файлу
   * @returns {string[]}
   * @private
   */
  static __getPath (path) {
    return [__dirname, ...DIR_CACHE, ...To.array(path)]
  }
}
