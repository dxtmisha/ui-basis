const PropertiesFiles = require('./PropertiesFiles')

const DIR_SAMPLE = [__dirname, '..', '..', 'media', 'templates']

module.exports = class DesignCommand {
  dirSampleName = 'sample'

  /**
   * Constructor
   * @param {string} name component name / названия компонента
   * @param {Object<string,*>} options additional parameters / дополнительные параметры
   */
  constructor (
    name,
    options = {}
  ) {
    this.name = name
    this.options = options // TODO: не использовано еще

    this.dir = []
  }

  init () {
    if (this.name) {
      console.info(`-- ${this.getNameCommand()}:`)

      this.initMain()

      console.info('-- end')
    } else {
      console.info('-- not name')
    }
  }

  initMain () {
    // Close
  }

  /**
   * Returns the names for the team
   *
   * Возвращает названия для команды
   * @return {string}
   */
  getNameCommand () {
    return this.name
  }

  /**
   * Returns the path for importing the module
   *
   * Возвращает путь для подключения модуля
   * @return {string}
   */
  getRoot () {
    const path = __filename.match(/node_modules\/([^/]+)/)

    if (path) {
      return `${path?.[1]}/`
    } else {
      return '../../'
    }
  }

  /**
   * Checks the presence of a file
   *
   * Проверяет наличие файла
   * @param {string} name file name / название файла
   * @return {boolean}
   * @protected
   */
  _isFile (name) {
    return PropertiesFiles.is([...this.dir, name])
  }

  /**
   * Reading
   *
   * Читает файл
   * @param {string} name file name / название файла
   * @return {string}
   * @protected
   */
  _read (name) {
    return PropertiesFiles.readFile([...this.dir, name])
  }

  /**
   * This code reads a template
   *
   * Читает шаблона
   * @param {string} name file name / название файла
   * @return {string}
   * @protected
   */
  _readSample (name) {
    return PropertiesFiles.readFile([...DIR_SAMPLE, this.dirSampleName, name])
  }

  /**
   * Creating or rewriting a file
   *
   * Создание или перезапись файла
   * @param {string} name file name / название файла
   * @param {string} value values for storage / значения для хранения
   * @protected
   */
  _createFile (name, value) {
    PropertiesFiles.createFile(
      this.dir,
      name,
      value,
      ''
    )
  }

  /**
   * Returns an array of paths to components
   *
   * Возвращает массив с путями к компонентам
   * @return {string[]}
   * @protected
   */
  _initDir () {
    return [PropertiesFiles.getRoot()]
  }

  /**
   * Outputting data to the console
   *
   * Вывод данных в консоль
   * @param {string} name file name / название файла
   * @protected
   */
  _console (name) {
    console.info(`--  ${this._isFile(name) ? 'update' : 'create'} ${name}`)
  }
}
