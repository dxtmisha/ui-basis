const { To } = require('../../To')

const Files = require('./PropertiesFiles')

const CACHE_STATUS = true
const DIR_CACHE = ['cache']
const DIR_STEP = ['step']
const DIR_COMPONENTS = ['components']
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
   * @type {{
   *   time: number,
   *   files: Object<string,string[]>,
   *   sizes: Object<string,number>
   * }}
   */
  static system = {
    time: 0,
    files: {},
    sizes: {}
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
   * Retrieving cache data or updating it if the size does not match
   *
   * Получение данных кеша или обновление его, если размер не соответствует
   * @param {string|string[]} paths path to the file / путь к файлу
   * @param {string} name file name / название файла
   * @param {string|string[]} pathControl путь к файл для получения информация и проверке
   * @param {Function} callback if the file is not found, the callback function is called and
   * its result is saved in the current file / если файл не найден, вызывается функция
   * обратного вызова (callback) и её результат сохраняется в текущем файле
   * @param {string} extension file extension by default is json / расширение файла по умолчанию - json
   * @return {Object<string, *>|*[]|string}
   */
  static getBySize (
    paths,
    name,
    pathControl,
    callback = undefined,
    extension = 'json'
  ) {
    if (
      CACHE_STATUS &&
      this.is(paths, name, extension) &&
      this.__isBySize(pathControl)
    ) {
      return this.__getCache(paths, name, extension)
    } else if (callback) {
      const value = callback(this.readBySize(pathControl))
      this.create(paths, name, value, extension)

      return value
    } else {
      return {}
    }
  }

  /**
   * Returns the path to the data by component
   *
   * Возвращает путь к данным по компоненту
   * @param {string} name the name of the component / название компонента
   * @return {string[]}
   */
  static getPathComponent (name) {
    return [...DIR_COMPONENTS, `${name.replace('.', '-')}.json`]
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
   * Reads the contents of the file and updates the file size label
   *
   * Читает содержимое файла и обновляет метку размера файла
   * @param {string|string[]} paths a sequence of path segments / последовательность сегментов пути
   * @return {undefined|Object<string, *>|string}
   */
  static readBySize (paths) {
    const path = this.__getPath(paths)

    if (Files.is(path)) {
      const read = Files.readFile(path)
      const pathSystem = Files.parse(this.__getPathSizeSystem(path))

      Files.createFile(
        [pathSystem.dir],
        pathSystem.name,
        { size: Files.stat(path).size }
      )

      return read
    }

    return undefined
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
   * Saves intermediate data
   *
   * Сохраняет промежуточные данные
   * @param {string} name file name / название файла
   * @param {Object<string,*>|*[]|string} value values for storage / значения для хранения
   */
  static createComponents (name, value) {
    this.create(DIR_COMPONENTS, name, value)
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

  static __getPathSizeSystem (paths) {
    return Files.joinPath(paths).replace(/(\.\w+)$/, '-system$1')
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
   * Checks if the file has been changed by its size
   *
   * Проверяет, изменен ли файл по его размеру
   * @param {string|string[]} paths a sequence of path segments / последовательность сегментов пути
   * @return {boolean}
   * @private
   */
  static __isBySize (paths) {
    const path = Files.joinPath(this.__getPath(paths))
    const pathSystem = this.__getPathSizeSystem(path)
    const system = Files.readFile(pathSystem)

    if (Files.stat(path)?.size === system.size) {
      return true
    } else {
      this.__console(`Updated file: ${path}`)
      return false
    }
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
