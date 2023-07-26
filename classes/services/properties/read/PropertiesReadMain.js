const {
  isFilled,
  isObject
} = require('../../../../functions/data')

const Cache = require('../PropertiesCache')
const Import = require('../PropertiesImport')
const Separator = require('../PropertiesSeparator')
const Standard = require('../PropertiesStandard')
const Wrap = require('../PropertiesWrap')

/**
 * A class for transforming global tokens
 *
 * Класс для преобразования глобальных токенов
 */
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
    return this.path.applyToDesignAll('main', (error, {
      design,
      path
    }) => {
      if (error === null) {
        let properties = Cache.read(path.file)

        if (
          isFilled(properties) &&
          isObject(properties)
        ) {
          properties = Standard.to({ [design]: properties })
          properties = new Import(properties, path.dir).to()

          if (Separator.is(properties)) {
            properties = Separator.to(properties)
            Wrap.to(properties)
          }

          return properties
        }
      }

      return {}
    })
  }
}
