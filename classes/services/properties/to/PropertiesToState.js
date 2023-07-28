const Keys = require('../PropertiesKeys')
const Type = require('../PropertiesType')

const FILE_CACHE = '032-state'

/**
 * A class for transforming components
 *
 * Класс для преобразования состояния
 */
module.exports = class PropertiesToState {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  to () {
    this.items.findVariable([Type.state]).forEach(({
      name,
      item
    }) => {
      item[Keys.name] = this.__getName(name, item)
    })

    this.items.createStep(FILE_CACHE)
  }

  /**
   * Name transformation for the state type
   *
   * Преобразование имени для типа state
   * @param {string} name base property name / базовое название свойства
   * @param {Object<string,*>} item current element / текущий элемент
   * @return {string}
   * @private
   */
  __getName (name, item) {
    if (item?.[Keys.fullName]) {
      return `&.${name}`
    } else {
      return `&--${name}`
    }
  }
}
