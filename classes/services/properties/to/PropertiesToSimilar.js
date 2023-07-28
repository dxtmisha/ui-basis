const Keys = require('../PropertiesKeys')
const Type = require('../PropertiesType')

const TYPE = [
  Type.var,
  Type.property
]

const EXCEPTION = [
  Type.classType,
  Type.subclass
]

const FILE_CACHE = '010-similar'

/**
 * A class for searching for related properties at a higher level to adopt their properties
 *
 * Класс для поиска родственных свойств на уровне выше для принятия их свойств
 */
module.exports = class PropertiesToSimilar {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Finding similar data for editing
   *
   * Поиск похожих данных для редактирования
   * @return {this}
   */
  to () {
    this.items.each(({
      item,
      name,
      parents
    }) => {
      const similar = this.__get(name, item, parents)

      if (similar) {
        item[Keys.rename] = this.items.getItemReName(name, similar)
        item[Keys.variable] = similar?.[Keys.variable]
      }
    })

    this.items.createStep(FILE_CACHE)
  }

  /**
   * Returns similar values by its name
   *
   * Возвращает похожие значения по его имени
   * @param {string} name name of the name / название имени
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @param {{name:string,item:Object<string,*>}[]} parents array of all ancestor properties
   * along the tree from the top level / массив со всеми свойствами предков по дереву от верхнего уровня
   * @return {Object<string,*>}
   * @private
   */
  __get (
    name,
    item,
    parents = undefined
  ) {
    const list = [...parents].reverse()

    if (
      !item?.[Keys.type] &&
      !item?.[Keys.rename] &&
      !this.__isException(item) &&
      !this.__isException(list?.[0]?.item)
    ) {
      list.shift()

      for (const { item } of list) {
        const similar = item?.value?.[name]

        if (this.__isException(item)) {
          break
        } else if (
          similar &&
          this.__is(similar) && (
            similar?.[Keys.type] ||
            similar?.[Keys.rename]
          )
        ) {
          return similar
        }
      }
    }

    return undefined
  }

  /**
   * Checks if the property is available for inheritance
   *
   * Проверяет, доступно ли свойство для наследования
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @return {boolean}
   * @private
   */
  __is (item) {
    return TYPE.indexOf(item?.[Keys.variable]) !== -1
  }

  /**
   * Checks if inheriting the property is prohibited
   *
   * Проверяет, запрещено ли наследовать свойство
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @return {boolean}
   * @private
   */
  __isException (item) {
    return EXCEPTION.indexOf(item?.[Keys.variable]) !== -1
  }
}
