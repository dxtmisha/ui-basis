const {
  forEach,
  replaceRecursive,
  isObject
} = require('../../../functions/data')

const Keys = require('./PropertiesKeys')

const SEPARATOR = process.env.VUE_APP_TOKEN_SEPARATOR
const BASIC = process.env.VUE_APP_TOKEN_BASIC

/**
 * Class for working with property splitting into multiple sub-properties
 *
 * Класс для работы с разделением свойства на множество под-свойств
 */
module.exports = class PropertiesSeparator {
  /**
   * Transforming a property with long names with separators into a set of sub-properties
   *
   * Преобразование свойства с длинными названиями с разделителями на множество под-свойств
   * @param {Object<string,{value:*}>|*} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @param {string} separator separator symbol / символ разделителя
   * @param {string} basic values to be deleted / значения для удаления
   * @return {Object<string,{value:*}>}
   */
  static to (
    properties,
    separator = SEPARATOR,
    basic = BASIC
  ) {
    if (isObject(properties)) {
      const data = {}

      forEach(properties, (item, name) => {
        const value = this.to(item?.value, separator, basic)

        if (this.__isSeparator(name, separator)) {
          const list = this.__removeBasicName(name, separator, basic).split(separator)

          replaceRecursive(
            data,
            this.__wrap(list, {
              ...item,
              value
            })
          )
        } else {
          data[name] = {
            ...item,
            value
          }
        }
      })

      return data
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
  static __isSeparator (name, separator) {
    return !!name.match(separator)
  }

  /**
   * Removing unnecessary characters from the name
   *
   * Удаление лишних символов из названия
   * @param {string} name property names / названия свойств
   * @param {string} separator separator symbol / символ разделителя
   * @param {string} basic values to be deleted / значения для удаления
   * @return {string}
   * @private
   */
  static __removeBasicName (
    name,
    separator,
    basic
  ) {
    return name
      .replaceAll(`${separator}${basic}`, '')
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
  static __wrap (list, item) {
    let data = item;

    [...list]
      .reverse()
      .forEach(name => {
        data = {
          [name]: {
            value: data,
            [Keys.wrap]: true
          }
        }
      })

    return data
  }
}
