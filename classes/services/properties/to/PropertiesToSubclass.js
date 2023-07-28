const Keys = require('../PropertiesKeys')
const Type = require('../PropertiesType')

const FILE_CACHE = '036-subclass'

/**
 * A class for transforming subclass
 *
 * Класс для преобразования subclass
 */
module.exports = class PropertiesToSubclass {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  to () {
    this.items.findVariable(Type.subclass).forEach(({
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
      return `& .${name}`
    } else if (this.__isParentState(parents)) {
      const parentsName = this.items.getParentsName(parents, [Type.subclass])
        .join('__')
        .replace('__', '-')

      return `& .${parentsName}__${name}`
    } else {
      return `&__${name}`
    }
  }

  /**
   * Checks if the top-level type is a state
   *
   * Проверяет, является ли тип верхнего уровня - это state
   * @param {{name:string,item:Object<string,*>}[]} parents array of all ancestor properties
   * along the tree from the top level / массив со всеми свойствами предков по дереву от верхнего уровня
   * @return {boolean}
   * @private
   */
  __isParentState (parents) {
    return parents[parents.length - 1].item?.[Keys.variable] === Type.state
  }
}
