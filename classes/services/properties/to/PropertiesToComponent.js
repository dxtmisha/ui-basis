const Keys = require('../PropertiesKeys')
const Type = require('../PropertiesType')

const FILE_CACHE = '028-component'

/**
 * A class for transforming components
 *
 * Класс для преобразования компонент
 */
module.exports = class PropertiesToComponent {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  to () {
    this.items.findVariable([Type.component, Type.theme]).forEach(({
      name,
      item,
      parents
    }) => {
      item[Keys.name] = this.__getName(name, item, parents)
    })

    this.items.createStep(FILE_CACHE)
  }

  /**
   * Name transformation for the component type
   *
   * Преобразование имени для типа component
   * @param {string} name base property name / базовое название свойства
   * @param {Object<string,*>} item current element / текущий элемент
   * @param {{name:string,item:Object<string,*>}[]} parents array of all ancestor properties
   * along the tree from the top level / массив со всеми свойствами предков по дереву от верхнего уровня
   * @return {string}
   * @private
   */
  __getName (name, item, parents) {
    if (item?.[Keys.fullName]) {
      return `${name}`
    } else {
      return `${this.items.getParentsName(parents).join('-')}-${name}`
    }
  }
}
