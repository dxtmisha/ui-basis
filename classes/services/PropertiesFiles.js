const { isFilled } = require('../../functions/data')
const { To } = require('../To')

const requireFs = require('fs')
const requirePath = require('path')

/**
 * A class for working with files
 *
 * Класс для работы с файлами
 */
module.exports = class PropertiesFiles {
  static root

  /**
   * The fs.existsSync() method is used to synchronously check if a file already
   * exists in the given path or not. It returns a boolean value which indicates
   * the presence of a file
   *
   * Метод fs.existsSync() используется для синхронной проверки наличия файла в
   * указанном пути. Он возвращает логическое значение, которое указывает на
   * наличие файла
   * @param {string|string[]} path it holds the path of the file that has to be checked / это
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
   * @param {string|string[]} name name of the element being checked / название проверяемого элемента
   * @return {boolean}
   */
  static isDir (name) {
    return !(this.joinPath(name)).match(/\.\w+$/)
  }

  /**
   * The path.joinPath() method joins all given path segments together using the
   * platform-specific separator as a delimiter, then normalizes the resulting path
   *
   * Метод path.joinPath() объединяет все указанные сегменты пути с использованием
   * специфического для платформы разделителя в качестве разделителя, а затем
   * нормализует полученный путь
   * @param {string|string[]} paths a sequence of path segments / последовательность сегментов пути
   * @returns {string}
   */
  static joinPath (paths) {
    return requirePath.join(...To.array(paths))
  }

  /**
   * Method returns an object whose properties represent significant elements of the path
   *
   * Метод возвращает объект, свойства которого представляют существенные элементы пути
   * @param {string} path filename / имя файла
   * @return {ParsedPath}
   */
  static parse (path) {
    return requirePath.parse(path)
  }

  /**
   * The method splits the path into an array of components
   *
   * Метод разбивает путь на массив компонентов
   * @param {string} path path to the directory / путь к директории
   * @return {string[]}
   */
  static splitForDir (path) {
    return (this.parse(path)?.dir || '').split(requirePath.sep)
  }

  /**
   * Reads the contents of the directory
   *
   * Читает содержимое директории
   * @param {string|string[]} paths path to the directory / путь к директории
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
      const data = requireFs.readFileSync(this.joinPath(paths)).toString()

      return data.match(/^[{[]/)
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
   * @param {string[]} paths path to the directory / путь к директории
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
   * @param {string|string[]} paths path to the file / путь к файлу
   * @param {string} name file name / название файла
   * @param {Object<string,*>|*[]|string} value values for storage / значения для хранения
   * @param {string} extension file extension by default is json / расширение файла по умолчанию - json
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
   * @param {string} name element name / название элемента
   * @param {string} extension file extension by default is json / расширение файла по умолчанию - json
   * @return {string}
   */
  static getFileName (name, extension = 'json') {
    if (isFilled(extension)) {
      return `${To.kebabCase(name)}.${extension}`
    } else {
      return name
    }
  }

  /**
   * Returns the root path
   *
   * Возвращает корневой путь
   * @return {string}
   */
  static getRoot () {
    return this.root
  }

  /**
   * Getting information about the file
   *
   * Получение информации о файле
   * @param {string|string[]} paths path to the file / путь к файлу
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

  /**
   * Initializing root path
   *
   * Инициализация корневого пути
   * @return {this}
   * @private
   */
  static __initRoot () {
    if (__dirname.match('node_modules')) {
      this.root = __dirname.replace(/node_modules.*?$/, '')
    } else {
      this.root = this.joinPath([__dirname, '..', '..'])
    }

    return this
  }

  static {
    this.__initRoot()
  }
}
