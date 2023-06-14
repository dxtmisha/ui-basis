const { To } = require('../To')

const requireFs = require('fs')
const requirePath = require('path')

/**
 * A class for working with files
 *
 * Класс для работы с файлами
 */
module.exports = class PropertiesFiles {
  /**
   * The fs.existsSync() method is used to synchronously check if a file already
   * exists in the given path or not. It returns a boolean value which indicates
   * the presence of a file
   *
   * Метод fs.existsSync() используется для синхронной проверки наличия файла в
   * указанном пути. Он возвращает логическое значение, которое указывает на
   * наличие файла
   * @param {string|string[]} path It holds the path of the file that has to be checked / Это
   * содержит путь к файлу, который необходимо проверить
   * @returns {boolean}
   * @public
   */
  static is (path) {
    return requireFs.existsSync(this.joinPath(path))
  }

  /**
   * Checks whether it is a directory
   *
   * Проверяет, является ли это директорией
   * @param {string} name Name of the element being checked / Название проверяемого элемента
   * @return {boolean}
   */
  static isDir (name) {
    return !name.match(/\.\w+$/)
  }

  /**
   * The path.joinPath() method joins all given path segments together using the
   * platform-specific separator as a delimiter, then normalizes the resulting path
   *
   * Метод path.joinPath() объединяет все указанные сегменты пути с использованием
   * специфического для платформы разделителя в качестве разделителя, а затем
   * нормализует полученный путь
   * @param {string|string[]} paths A sequence of path segments / Последовательность сегментов пути
   * @returns {string}
   */
  static joinPath (paths) {
    return requirePath.join(...To.array(paths))
  }

  /**
   * Reads the contents of the directory
   *
   * Читает содержимое директории
   * @param {string|string[]} paths Path to the directory / Путь к директории
   * @returns {string[]}
   */
  static readDir (paths) {
    return this.is(paths) ? requireFs.readdirSync(this.joinPath(paths)) : []
  }

  /**
   * Returns the contents of the path
   *
   * Возвращает содержимое пути
   * @param {string|string[]} paths filename / имя файла
   * @returns {Object<string,*>|string}
   */
  static readFile (paths) {
    if (this.is(paths)) {
      const data = requireFs.readFileSync(this.joinPath(paths))

      return data.toString().match(/^[{[]/)
        ? JSON.parse(data || '{}')
        : data
    } else {
      return {}
    }
  }

  /**
   * Synchronously creates a directory
   *
   * Синхронно создает директорию
   * @param {string[]} paths Path to the directory / Путь к директории
   * @returns {PropertiesFiles}
   */
  static createDir (paths) {
    const dirs = []

    paths.forEach(path => {
      dirs.push(path)
      if (!this.is(dirs)) {
        requireFs.mkdirSync(this.joinPath(dirs))
      }
    })

    return this
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
  static createFile (
    paths,
    name,
    value,
    extension = 'json'
  ) {
    this.createDir(paths)

    requireFs.writeFileSync(
      this.joinPath([...paths, this.getFileName(name, extension)]),
      typeof value === 'object' ? JSON.stringify(value) : value
    )

    return this
  }

  /**
   * Returns the file name
   *
   * Возвращает имя файла
   * @param {string} name Element name / Название элемента
   * @param {string} extension
   * @return {string}
   */
  static getFileName (name, extension = 'json') {
    return `${To.kebabCase(name)}.${extension}`
  }

  /**
   * Getting information about the file
   *
   * Получение информации о файле
   * @param {string|string[]} paths Path to the file / Путь к файлу
   * @return {Promise<{mtime: number}>}
   */
  static stat (paths) {
    return new Promise((resolve, reject) => {
      requireFs.stat(
        this.joinPath(To.array(paths) || ''),
        (error, stats) => {
          if (error) {
            reject(error)
          } else {
            resolve(stats)
          }
        }
      )
    })
  }
}
