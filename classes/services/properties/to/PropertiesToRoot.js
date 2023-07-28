const Keys = require('../PropertiesKeys')
const Type = require('../PropertiesType')

const FILE_CACHE = '038-root'

/**
 * A class for transforming class
 *
 * Класс для преобразования class
 */
module.exports = class PropertiesToRoot {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  to () {
    this.items.findVariable(Type.root).forEach(({
      design,
      component,
      name,
      item
    }) => {
      item[Keys.name] = this.__getName(design, component, name)
    })

    this.items.createStep(FILE_CACHE)
  }

  /**
   @param {string} design design name / название дизайна
   @param {string} component component name / название компонента
   * @param {string} name base property name / базовое название свойства
   * @return {string}
   * @private
   */
  __getName (design, component, name) {
    return `${this.items.toFullLink(design, component, name)} &`
  }
}
