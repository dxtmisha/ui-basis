const {
  replaceRecursive,
  isFilled,
  isObject
} = require('../../../../functions/data')

const Files = require('../PropertiesFiles')
const Cache = require('../PropertiesCache')
const Standard = require('../PropertiesStandard')
const Import = require('../PropertiesImport')

module.exports = class PropertiesReadMain {
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
   * Возвращает все основные токены
   * @return {Object<string,*>}
   */
  get () {
    const data = {}

    this.path.getDesigns().forEach(
      design => replaceRecursive(data, this.getByDesigns(design))
    )

    return data
  }

  /**
   * Returns global tokens by design name
   *
   * Возвращает глобальные токены по названию дизайна
   * @param {string} design design name / название дизайна
   * @return {Object<string, *>}
   */
  getByDesigns (design) {
    return Cache.get(['main'], `main-${design}`, () => {
      const data = {}

      this.path.getPathsProperties(design).forEach(path => {
        let properties = Cache.read(path)

        if (
          isFilled(properties) &&
          isObject(properties)
        ) {
          properties = Standard.to({ [design]: properties })
          properties = new Import(properties, path).to()

          replaceRecursive(data, properties)
        }
      })

      return data
    })
  }
}
