const {
  isFilled,
  isObject,
  replaceRecursive
} = require('../../../../functions/data')
const { To } = require('../../../To')

const Cache = require('../PropertiesCache')
const Files = require('../PropertiesFiles')
const Standard = require('../PropertiesStandard')

module.exports = class PropertiesReadSettings {
  /**
   * Constructor
   * @param {PropertiesPath} path object of the class for working with paths / объект класса для работы с путями
   */
  constructor (path) {
    this.path = path
  }

  /**
   * Returns the basic settings of the component
   *
   * Возвращает базовые настройки у компонента
   * @return {Object<string,*>}
   */
  get () {
    return this.path.applyToDesignAll('settings', (error, {
      design,
      path
    }) => {
      if (error === null) {
        const dirs = Files.readDir(path.dir)
        const data = {}

        dirs.forEach(dir => {
          if (Files.isDir(dir)) {
            const properties = Cache.read([...path.dir, dir, this.path.getFileName()])

            if (
              isFilled(properties) &&
              isObject(properties)
            ) {
              replaceRecursive(data, Standard.to({
                [design]: {
                  [To.camelCase(dir)]: properties
                }
              }))
            }
          }
        })

        return data
      }

      return {}
    })
  }
}
