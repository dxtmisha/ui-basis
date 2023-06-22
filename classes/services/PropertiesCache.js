const { To } = require('../To')

const PropertiesFiles = require('./PropertiesFiles')

const CACHE_STATUS = true
const DIR_CACHE = ['cache']

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
   * @param {string|string[]} paths path to the file / путь к файлу
   * @param {string} name file name / название файла
   * @param {string} extension file extension by default is json / расширение файла по умолчанию - json
   * @return {boolean}
   */
  static is (paths, name, extension = 'json') {
    return PropertiesFiles.is(this.__getPath([...paths, PropertiesFiles.getFileName(name, extension)]))
  }

  /**
   * Reads the content of the file
   *
   * Читает содержимое файла
   * @param {string|string[]} paths path to the file / путь к файлу
   * @param {string} name file name / название файла
   * @param {Function} callback if the file is not found, the callback function is called and
   * its result is saved in the current file / если файл не найден, вызывается функция
   * обратного вызова (callback) и её результат сохраняется в текущем файле
   * @param {string} extension file extension by default is json / расширение файла по умолчанию - json
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
   * @param {string|string[]} paths path to the file / путь к файлу
   * @param {string} name file name / название файла
   * @param {Object<string,*>|*[]|string} value values for storage / значения для хранения
   * @param {string} extension file extension by default is json / расширение файла по умолчанию - json
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
   * @param {string|string[]} path path to the file / путь к файлу
   * @returns {string[]}
   * @private
   */
  static __getPath (path) {
    return [PropertiesFiles.getRoot(), ...DIR_CACHE, ...To.array(path)]
  }
}
