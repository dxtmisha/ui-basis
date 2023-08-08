const Keys = require('../PropertiesKeys')

const FILE_CACHE = '018-full'

/**
 * A class for transforming components
 *
 * Класс для преобразования состояния
 */
module.exports = class PropertiesToFull {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  to () {
    this.items.each(({
      design,
      component,
      name,
      value,
      item
    }) => {
      item[Keys.name] = this.items.toFullLink(design, component, this.items.getItemReName(name, item), '-')

      if (typeof value === 'string') {
        item[Keys.css] = this.items.toFullLink(design, component, value)
      }
    })

    this.items.createStep(FILE_CACHE)
  }
}
