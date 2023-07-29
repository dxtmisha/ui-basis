const Cache = require('../PropertiesCache')
const Keys = require('../PropertiesKeys')
const Type = require('../PropertiesType')

const DIR = ['components']

/**
 * Класс для разделения компоненты на разный файлы
 */
module.exports = class PropertiesToDivision {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  to () {
    this.items.findVariable(Type.component)
      .forEach(({
        name,
        value,
        item
      }) => {
        Cache.create(DIR, item?.[Keys.name] || name, value)
      })
  }
}
