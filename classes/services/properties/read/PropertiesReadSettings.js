// const Files = require('./PropertiesFiles')
const PropertiesFiles = require('../PropertiesFiles')

module.exports = class PropertiesReadSettings {
  /**
   * Constructor
   * @param {PropertiesPath} path object of the class for working with paths / объект класса для работы с путями
   */
  constructor (path) {
    this.path = path
  }

  /**
   * Returns all main tokens
   *
   * Возвращает базовый настройки у компонента
   * @return {Object<string,*>}
   */
  get () {
    return this.path.applyToDesignAll('settings', (error, {
      design,
      path
    }) => {
      if (error === null) {
        const dirs = PropertiesFiles.readDir(path.dir)

        dirs.forEach(dir => {
          if (PropertiesFiles.isDir(dir)) {
            console.log('dir', design, dir)
            // Files.readFile([])
          }
        })
      }
    })
  }
}
