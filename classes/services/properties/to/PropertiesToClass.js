const Keys = require('../PropertiesKeys')
const Type = require('../PropertiesType')

const FILE_CACHE = '030-class'

/**
 * A class for transforming class
 *
 * Класс для преобразования class
 */
module.exports = class PropertiesToClass {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  to () {
    this.items.findVariable(Type.classType).forEach(({
      name,
      item,
      parents
    }) => {
      item[Keys.name] = this.__getName(name, item, parents)
    })

    this.items.createStep(FILE_CACHE)
  }

  /**
   * @param {string} name base property name / базовое название свойства
   * @param {Object<string,*>} item current element / текущий элемент
   * @param {{name:string,item:Object<string,*>}[]} parents array of all ancestor properties
   * along the tree from the top level / массив со всеми свойствами предков по дереву от верхнего уровня
   * @return {string}
   * @private
   */
  __getName (name, item, parents) {
    if (item?.[Keys.fullName]) {
      return `& .${name}`
    } else {
      return `& .${parents?.[0]?.name}-${name}`
    }
  }
}
