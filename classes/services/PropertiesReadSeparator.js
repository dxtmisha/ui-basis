const {
  forEach,
  isObject,
  replaceRecursive
} = require('../../functions/data')

const PropertiesTool = require('./PropertiesTool')

const READ_SEPARATOR = '/'
const READ_SIMPLIFICATION = 'basic'

/**
 * Class for working with property splitting into multiple sub-properties
 *
 * Класс для работы с разделением свойства на множество под-свойств
 */
module.exports = class PropertiesReadSeparator {
  /**
   * Начало преобразования
   * @param {Object<string,*>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @return {*}
   */
  to (properties) {
    const newProperties = this.__toGo(properties)

    this.__toDuplicatesParent(newProperties)
    this.__toDuplicatesRemove(newProperties)

    return newProperties
  }

  /**
   * Начало преобразования
   * @param {Object<string,*>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @param {string} separator separator symbol / символ разделителя
   * @param {string} simplification values to be deleted / значения для удаления
   * @return {*}
   */
  __toGo (
    properties,
    separator = READ_SEPARATOR,
    simplification = READ_SIMPLIFICATION
  ) {
    const values = PropertiesTool.getValue(properties)

    if (isObject(values)) {
      let newProperties = {}

      separator = properties?.[PropertiesTool.getKeySeparator()] || separator
      simplification = properties?.[PropertiesTool.getKeySimplification()] || simplification

      forEach(values, (item, name) => {
        const newItem = this.__toGo(item, separator, simplification)

        if (this.__isSeparator(name, separator)) {
          const list = this.__getNameList(
            this.__toSimplification(
              name,
              separator,
              simplification
            ),
            separator
          )

          newProperties = replaceRecursive(newProperties, this.__toWrap(list, newItem))
        } else {
          newProperties[name] = newItem
        }
      })

      return PropertiesTool.getPropertiesByValue(properties, newProperties)
    } else {
      return properties
    }
  }

  /**
   * Checks if the property is suitable for splitting
   *
   * Проверяет, подходит ли свойство для разделения
   * @param {string} name property names / названия свойств
   * @param {string} separator separator symbol / символ разделителя
   * @return {boolean}
   * @private
   */
  __isSeparator (name, separator) {
    return !!name.match(separator)
  }

  /**
   * Returns a broken list of names by name
   *
   * Возвращает разбитый список названий по имени
   * @param {string} name property names / названия свойств
   * @param {string} separator separator symbol / символ разделителя
   * @return {string[]}
   * @private
   */
  __getNameList (name, separator) {
    return name.split(separator)
  }

  /**
   * Removing unnecessary characters from the name
   *
   * Удаление лишних символов из названия
   * @param {string} name property names / названия свойств
   * @param {string} separator separator symbol / символ разделителя
   * @param {string} simplification values to be deleted / значения для удаления
   * @return {string}
   * @private
   */
  __toSimplification (name, separator, simplification) {
    return name
      .replaceAll(`${separator}${simplification}`, '')
      .replace(new RegExp(`${separator}$`), '')
  }

  /**
   * Packs a property into objects by an array of titles
   *
   * Упаковывает свойство в объекты по массиву названий
   * @param {string[]} list array of titles / массив названий
   * @param {Object<string,*>} item property values / значения свойств
   * @return {Object<string,*>}
   * @private
   */
  __toWrap (list, item) {
    const keyWrap = PropertiesTool.getKeyWrap()
    let data = item;

    [...list]
      .reverse()
      .forEach(name => {
        data = {
          [name]: {
            value: data,
            [keyWrap]: true
          }
        }
      })

    return data
  }

  /**
   * The method adds a duplicate property to its parent property
   *
   * Метод добавляет дублирующее свойство в его свойство предка
   * @param {Object<string,*>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @private
   */
  __toDuplicatesParent (properties) {
    const keyWrap = PropertiesTool.getKeyWrap()

    forEach(PropertiesTool.getValue(properties), item => {
      const values = PropertiesTool.getValue(item)

      if (item?.[keyWrap]) {
        const selectors = this.__getSelectors(values)

        if (selectors.quantity > 0) {
          forEach(selectors.items, (property, name) => {
            if (
              !(name in values) &&
              property.quantity === selectors.quantity
            ) {
              const maxValue = this.__getMaxRepeat(property.values)

              if (maxValue) {
                values[name] = maxValue
              }
            }
          })
        }

        delete item[keyWrap]
      }

      this.__toDuplicatesParent(item)
    })
  }

  /**
   * The method processes the properties and returns all the names of the property and its values
   *
   * Метод обрабатывает свойства и возвращает все названия свойства и его значения
   * @param {Object<string,*>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @return {{
   *   quantity: number,
   *   items: Object<string, {
   *     quantity: number,
   *     values: Object<string,*[]>
   *   }>
   * }}
   * @private
   */
  __getSelectors (properties) {
    const data = {
      items: {},
      quantity: 0
    }

    forEach(properties, (item, name) => {
      const values = PropertiesTool.getValue(item)

      if (
        !PropertiesTool.isSpecial(name) &&
        isObject(values)
      ) {
        data.quantity++
        this.__addSelectorsItem(data.items, item)
      }
    })

    return data
  }

  /**
   * Adding information about the property and its values
   *
   * Добавления информация об свойство и его значения
   * @param {Object<string, {
   *   quantity: number,
   *   values: Object<string,*[]>
   * }>} data object with all the collected data / объект со всеми собранными данными
   * @param {Object<string,*>} properties list of properties / свойств
   * @private
   */
  __addSelectorsItem (data, properties) {
    forEach(PropertiesTool.getValue(properties), (item, name) => {
      const value = PropertiesTool.getValue(item)

      if (!isObject(value)) {
        if (!(name in data)) {
          data[name] = {
            quantity: 0,
            values: {}
          }
        }

        if (!(value in data[name].values)) {
          data[name].values[value] = []
        }

        data[name].quantity++
        data[name].values[value].push(properties)
      }
    })
  }

  /**
   * Returns values with maximum repetitions
   *
   * Возвращает значения с максимальными повторами
   * @param {Object<string,*[]>} values values for verification / значения для проверки
   * @return {string}
   * @private
   */
  __getMaxRepeat (values) {
    let max = 0
    let focusValue

    forEach(values, (item, value) => {
      if (
        item.length > 1 && (
          item.length > max ||
          focusValue === undefined
        )
      ) {
        max = item.length
        focusValue = value
      }
    })

    return focusValue
  }

  /**
   * The method removes repeating properties
   *
   * Метод удаляет повторяющиеся свойства
   * @param {Object<string,*>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @param {Object<string,*>} parent Свойство предка
   * @private
   */
  __toDuplicatesRemove (properties, parent = undefined) {
    const keyWrap = PropertiesTool.getKeyWrap()
    const values = PropertiesTool.getValue(properties)

    forEach(values, item => {
      if (typeof PropertiesTool.getValue(item) === 'object') {
        this.__toDuplicatesRemove(item, PropertiesTool.getValue(properties))
      }
    })

    forEach(values, (item, name) => {
      const value = PropertiesTool.getValue(item)

      if (
        properties?.[keyWrap] &&
        parent &&
        typeof value !== 'object' &&
        PropertiesTool.getValue(parent?.[name]) === value
      ) {
        delete values[name]
      }
    })
  }
}
