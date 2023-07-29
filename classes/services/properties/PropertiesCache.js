const { To } = require('../../To')

const Files = require('./PropertiesFiles')

const CACHE_STATUS = true
const DIR_CACHE = ['cache']
const DIR_STEP = ['step']
const FILE_SYSTEM = 'system'

/**
 * Processing for storing temporary files
 *
 * Обработка для хранения временных файлов
 */
module.exports = class PropertiesCache {
  /**
   * System data for file version control. This array stores the time of the last launch
   * and the list of files that were read
   *
   * Системные данные для контроля версии файла. В этом массиве хранится время последнего запуска
   * и список файлов, которые были прочитаны
   * @type {{files: Object<string,string[]>, time: number}}
   */
  static system = {
    time: 0,
    files: {}
  }

  /**
   * The name of the cache, by which the names of the files are stored during the execution of
   * the script for saving the cache
   *
   * Имя кэша, по которому сохраняются названия файлов во время выполнения скрипта для сохранения кэша
   * @type {string[]}
   */
  static listenerName = ['global']

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
    return Files.is(this.__getPath([...paths, Files.getFileName(name, extension)]))
  }

  /**
   * Reads data from the cache or updates the cache if the data is outdated
   *
   * Читает данные из кэша или обновляет кэш, если данные устарели
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
    if (
      CACHE_STATUS &&
      this.is(paths, name, extension) &&
      this.__isBySystem(name)
    ) {
      return this.__getCache(paths, name, extension)
    } else if (callback) {
      this.listenerName.push(name)

      const value = callback()
      this.create(paths, name, value, extension)

      this.listenerName.pop()
      this.__writeSystem()

      return value
    } else {
      return {}
    }
  }

  /**
   * Returns the content of the file by the specified path
   *
   * Возвращает содержимое файла по указанному пути
   * @param {string|string[]} paths filename / имя файла
   * @returns {Object<string,*>|string}
   */
  static read (paths) {
    if (Files.is(paths)) {
      const path = Files.joinPath(paths)

      this.listenerName.forEach(name => {
        if (!(name in this.system.files)) {
          this.system.files[name] = [path]
        } else if (this.system.files[name].indexOf(path) === -1) {
          this.system.files[name].push(path)
        }
      })
    }

    return Files.readFile(paths)
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
    Files.createFile(this.__getPath(paths), name, value, extension)
    return this
  }

  /**
   * Saves intermediate data
   *
   * Сохраняет промежуточные данные
   * @param {string} name file name / название файла
   * @param {Object<string,*>|*[]|string} value values for storage / значения для хранения
   */
  static createStep (name, value) {
    this.create(DIR_STEP, name, value)
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
    return [Files.getRoot(), ...DIR_CACHE, ...To.array(path)]
  }

  /**
   * Reads the content of the file
   *
   * Читает содержимое файла
   * @param {string|string[]} paths path to the file / путь к файлу
   * @param {string} name file name / название файла
   * @param {string} extension file extension by default is json / расширение файла по умолчанию - json
   * @return {Object<string, *>|*[]|string}
   */
  static __getCache (paths, name, extension = 'json') {
    const path = this.__getPath([...To.array(paths), Files.getFileName(name, extension)])
    return Files.readFile(path)
  }

  /**
   * Checks if there are updated files
   *
   * Проверяет, есть ли обновленные файлы
   * @param {string} name the name of the cache / название кэша
   * @return {boolean}
   * @private
   */
  static __isBySystem (name = 'global') {
    let update = false

    if (name in this.system.files) {
      this.system.files[name].forEach(path => {
        if (Files.stat(path)?.mtimeMs > this.system.time) {
          update = true
          this.__console(`Modified file: ${name} - ${path}`)
        }
      })
    }

    return !update
  }

  /**
   * Reads the file with system data, if it exists. Executes only 1 time at the beginning
   *
   * Читает файл с системными данными, если он есть. Выполняется только 1 раз в начале
   * @private
   */
  static __initSystem () {
    if (this.is([], FILE_SYSTEM)) {
      const read = this.__getCache([], FILE_SYSTEM)

      if ('time' in read && 'files' in read) {
        this.system = read
      }
    }
  }

  /**
   * Updates the system data and writes them. Executes after saving the cache
   *
   * Обновляет системные данные и записывает их. Выполняется после сохранения кэша
   * @private
   */
  static __writeSystem () {
    if (this.listenerName.length < 2) {
      this.system.time = new Date().getTime()

      this.create([], FILE_SYSTEM, this.system)
      this.__console('Writes the system data')
    }
  }

  /**
   * Adding a new message to the console
   *
   * Добавление нового сообщения в консоли
   * @param {string} text text of the message / текст сообщения
   */
  static __console (text) {
    console.info('[Cache]', text)
  }

  static {
    this.__initSystem()
  }
}
