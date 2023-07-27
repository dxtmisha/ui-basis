const {
  forEach,
  isFilled,
  isObject,
  replaceRecursive
} = require('../../../functions/data')

const Keys = require('./PropertiesKeys')

/**
 * The base name, which is taken as the starting value. Used in grouped names
 *
 * Базовое название, которое принимается как стартовое значение. Используется в группированных именах
 * @type {string}
 */
const BASIC = process.env.VUE_APP_TOKEN_SEPARATOR_BASIC || 'basic'

/**
 * Indicates how far inside the array it is necessary to check for the presence of grouped values
 *
 * Указывает, на сколько внутри массива надо проверять на наличие группированных значений
 * @type {number}
 */
const LIMIT = parseInt(process.env.VUE_APP_TOKEN_SEPARATOR_LIMIT) || 3

/**
 * Class for working with property splitting into multiple sub-properties
 *
 * Класс для работы с разделением свойства на множество под-свойств
 */
module.exports = class PropertiesSeparator {
  /**
   * Checks if the structure has grouped records
   *
   * Проверяет, есть ли у структуры сгруппированные записи
   * @param {Object<string,{value:*}>|*} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @param {number} limit the maximum permissible level of verification / максимальный
   * допустимый уровень проверки
   * @return {boolean}
   */
  static is (
    properties,
    limit = LIMIT
  ) {
    if (
      limit > 0 &&
      isFilled(properties) &&
      isObject(properties)
    ) {
      for (const item in properties) {
        if (item.match(Keys.SEPARATOR)) {
          return true
        } else if (this.is(properties[item]?.value, limit - 1)) {
          return true
        }
      }
    }
  }

  /**
   * Transforming a property with long names with separators into a set of sub-properties
   *
   * Преобразование свойства с длинными названиями с разделителями на множество под-свойств
   * @param {Object<string,{value:*}>|*} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @return {Object<string,{value:*}>}
   */
  static to (
    properties
  ) {
    if (isObject(properties)) {
      const data = {}

      forEach(properties, (item, name) => {
        const value = this.to(item?.value)
        let newProperties

        if (this.__isSeparator(name)) {
          const list = this.__removeBasicName(name).split(Keys.SEPARATOR)

          newProperties = this.__wrap(list, {
            ...item,
            value
          })?.value
        } else {
          newProperties = {
            [name]: {
              ...item,
              value
            }
          }
        }

        replaceRecursive(data, newProperties)
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
   * @return {boolean}
   * @private
   */
  static __isSeparator (name) {
    return !!name.match(Keys.SEPARATOR)
  }

  /**
   * Removing unnecessary characters from the name
   *
   * Удаление лишних символов из названия
   * @param {string} name property names / названия свойств
   * @return {string}
   * @private
   */
  static __removeBasicName (name) {
    return name
      .replaceAll(`${Keys.SEPARATOR}${BASIC}`, '')
      .replace(new RegExp(`${Keys.SEPARATOR}$`), '')
  }

  /**
   * Packs a property into objects by an array of titles
   *
   * Упаковывает свойство в объекты по массиву названий
   * @param {string[]} list array of titles / массив названий
   * @param {Object<string,*>} item property values / значения свойств
   * @return {Object<string,{value:*}>}
   * @private
   */
  static __wrap (list, item) {
    let data = item;

    [...list]
      .reverse()
      .forEach(name => {
        data = {
          value: {
            [name]: {
              ...data,
              [Keys.wrap]: true
            }
          }
        }
      })

    return data
  }
}
