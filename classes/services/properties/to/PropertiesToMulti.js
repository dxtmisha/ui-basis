const { forEach } = require('../../../../functions/data')

const Keys = require('../PropertiesKeys')

const TYPE = ['var', 'state']
const FILE_CACHE = '012-multi'

/**
 * Class for converting properties with multiple values
 *
 * Класс для преобразования свойств с множеством значений
 */
module.exports = class PropertiesToMulti {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Converts property records with multiple types
   *
   * Преобразует записи свойств со множеством типов
   * @return {this}
   */
  to () {
    this.__getList().forEach(({
      item,
      name,
      value
    }) => {
      this.__to(value, item?.[Keys.rename] || name)

      item[Keys.variable] = 'state'
    })

    this.items.createStep(FILE_CACHE)

    return this
  }

  /**
   * Returns a list of properties with multiple values
   *
   * Возвращает список свойств с множеством значений
   * @return {{
   *   design?: string,
   *   component?: string,
   *   name?: string,
   *   value?: *,
   *   item?: Object<string,*>,
   *   parent?: Object<string,*>,
   *   parents?: {name:string, item: Object<string,*>}[]
   * }[]}
   * @private
   */
  __getList () {
    return this.items.each((property) => {
      const {
        item,
        value
      } = property

      if (
        item?.[Keys.variable] === 'property' &&
        typeof value === 'object'
      ) {
        return property
      }
    })
  }

  /**
   * Transformation for the element
   *
   * Преобразование для элемента
   * @param {Object<string,*>} properties an array that needs to be
   * @param {string} name property name / название свойства
   * transformed / массив, который нужно преобразовать
   * @private
   */
  __to (properties, name) {
    forEach(properties, item => {
      if (
        typeof item?.value === 'string' &&
        TYPE.indexOf(item?.[Keys.variable]) !== -1
      ) {
        item[Keys.variable] = 'state'
        item.value = {
          [name]: {
            value: item.value,
            [Keys.variable]: 'property'
          }
        }
      }
    })
  }
}
