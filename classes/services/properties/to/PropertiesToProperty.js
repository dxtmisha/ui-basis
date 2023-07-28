const ToVar = require('./PropertiesToVar')
const Type = require('../PropertiesType')

const FILE_CACHE = '024-property'

module.exports = class PropertiesToProperty extends ToVar {
  type = Type.property
  cacheName = FILE_CACHE

  /**
   * Name transformation for the var type
   *
   * Преобразование имени для типа var
   * @param {string} name base property name / базовое название свойства
   * @param {Object<string,*>} item current element / текущий элемент
   * @param {{name:string,item:Object<string,*>}[]} parents array of all ancestor properties
   * along the tree from the top level / массив со всеми свойствами предков по дереву от верхнего уровня
   * @return {string}
   * @private
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __getName (name, item, parents) {
    return this.items.getItemReName(name, item)
  }
}
