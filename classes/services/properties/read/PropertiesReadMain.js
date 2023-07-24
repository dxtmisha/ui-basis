const {
  replaceRecursive,
  isFilled,
  isObject
} = require('../../../../functions/data')

const PropertiesCache = require('../PropertiesCache')
const PropertiesStandard = require('../PropertiesStandard')

module.exports = class PropertiesReadMain {
  /**
   * Constructor
   * @param {PropertiesPath} path object of the class for working with paths  объект класса для работы с путями
   */
  constructor (path) {
    this.path = path
  }

  /**
   * Returns all main tokens
   *
   * Возвращает все основные токены
   * @return {Object<string,*>}
   */
  get () {
    const data = {}

    this.path.getDesigns().forEach(design => {
      this.path.getPathsProperties(design).forEach(path => {
        let properties = PropertiesCache.read(path)

        if (isFilled(properties) && isObject(properties)) {
          properties = PropertiesStandard.to({ [design]: properties })
          replaceRecursive(data, properties)
        }
      })
    })

    return data
  }
}
