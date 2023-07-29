const {
  getColumn,
  isFilled
} = require('../../../../functions/data')

const Type = require('../PropertiesType')

const TYPES = [
  Type.var,
  Type.property
]

/**
 * Class for cleaning all empty entries for clothing the array
 *
 * Класс для очистки всех пустых записей для облечения массива
 */
module.exports = class PropertiesToNone {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Removes all empty entries from the data
   *
   * Удаляет у данных всех пустых записей
   */
  to () {
    this.items.findVariable(TYPES)
      .forEach(({
        name,
        value,
        parent,
        parents
      }) => {
        if (!isFilled(value)) {
          console.error('[None]', `{${getColumn(parents, 'name').join('.')}.${name}}`)
          delete parent[name]
        }
      })
  }
}
