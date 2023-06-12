// const PropertiesItems = require('./PropertiesItems')
const PropertiesTool = require('./PropertiesTool')
const { forEach } = require('../../functions/data')

const FILE_CACHE_MULTI = 'properties-multi'

/**
 * Class for converting properties with multiple values
 *
 * Класс для преобразования свойств с множеством значений
 */
module.exports = class PropertiesToMulti {
  /**
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
    const key = PropertiesTool.getKeyVariable()

    this.__getList().forEach(({
      item,
      name,
      value
    }) => {
      item[key] = 'section'
      this.__toGo(name, value)
    })

    this.items.cache(FILE_CACHE_MULTI)

    return this
  }

  /**
   * Returns a list of properties with multiple values
   *
   * Возвращает список свойств с множеством значений
   * @return {{
   *   item: Object<string,*>,
   *   name: string,
   *   value: Object<string,*>
   * }[]}
   * @private
   */
  __getList () {
    const keyName = PropertiesTool.getKeyName()
    const keyVariable = PropertiesTool.getKeyVariable()

    return this.items.each(({ item }) => {
      if (
        item?.[keyVariable] === 'property' &&
        typeof item?.value === 'object'
      ) {
        return {
          item,
          name: item?.[keyName],
          value: item.value
        }
      }
    })
  }

  /**
   * Transformation for the element
   *
   * Преобразование для элемента
   * @param {string} name Property name / Название свойства
   * @param {Object<string,*>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @private
   */
  __toGo (name, properties) {
    const keyVariable = PropertiesTool.getKeyVariable()

    forEach(properties, item => {
      if (
        typeof item?.value !== 'object'
      ) {
        item[keyVariable] = 'section'
        item.value = {
          [name]: {
            value: item.value,
            [PropertiesTool.getKeyName()]: name,
            [keyVariable]: 'property'
          }
        }
      }
    })
  }
}
