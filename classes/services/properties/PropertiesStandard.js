const {
  forEach,
  replaceRecursive,
  isFilled
} = require('../../../functions/data')

const Keys = require('./PropertiesKeys')
const Tool = require('./PropertiesTool')

/**
 * A class for transforming a property into a basic structure for work
 *
 * Класс для преобразования свойства в базовую структуру для работы
 */
module.exports = class PropertiesStandard {
  /**
   * Transforms an array into the required data structure
   *
   * Преобразует массив в нужную структуру
   * @param {Object<string,*>|{}} properties an array that needs to be
   * transformed / массив, который нужно преобразовать
   * @return {Object<string,Object<string,*>>}
   */
  static to (properties) {
    const data = {}

    forEach(properties, (item, name) => {
      const key = Tool.getName(name)
      const value = this.__getValue(key, item)

      const type = value?.[Keys.type] || Tool.getVariableInName(name)
      const newKey = Tool.reKey(key, type)

      if (
        typeof value === 'object' &&
        'value' in value
      ) {
        this.addType(value, type)
        this.addFull(value, name)
        this.valueToString(value)

        if (newKey in data) {
          replaceRecursive(data[newKey], value)
          return
        }
      }

      data[newKey] = value
    })

    return data
  }

  /**
   * Transform the property value into the required format
   *
   * Преобразовать значение свойства в необходимый формат
   * @param {string} key property name / название свойства
   * @param {Object<string, *>|string|number} value values for conversion / значения для преобразования
   * @return {Object<string, *>}
   * @private
   */
  static __getValue (key, value) {
    if (Keys.isSpecial(key)) {
      return value
    } else if (
      typeof value !== 'object' ||
      Array.isArray(value)
    ) {
      return { value }
    } else if (isFilled(value)) {
      if (!('value' in value)) {
        return this.__getValueAndSpecial(this.to(value))
      } else if (typeof value.value === 'object') {
        return {
          ...value,
          value: this.to(value.value)
        }
      } else {
        return value
      }
    } else {
      return { value: {} }
    }
  }

  /**
   * Separate a special property from regular values
   *
   * Разделить специальное свойство от обычных значений
   * @param {Object<string,*>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @return {Object<string,*>}
   * @private
   */
  static __getValueAndSpecial (properties) {
    const value = {}
    const special = {}

    forEach(properties, (item, name) => {
      if (Keys.isSpecial(name)) {
        special[name] = item
      } else {
        value[name] = item
      }
    })

    return {
      value,
      ...special
    }
  }

  /**
   * Добавляет тип, если есть
   * @param {Object<string, *>|string|number} value values for conversion / значения для преобразования
   * @param {string|undefined} type property type / тип свойства
   */
  static addType (value, type) {
    if (!(Keys.type in value) && type) {
      value[Keys.type] = type
    }
  }

  /**
   * Adds a label that the property name is the final version and does not require additional processing
   *
   * Добавляет метку, что имя свойства является финальной версией и не требует дополнительной обработки
   * @param {Object<string, *>|string|number} value values for conversion / значения для преобразования
   * @param {string} name key name / название ключа
   */
  static addFull (value, name) {
    if (!(Keys.fullName in value) && Tool.isFull(name)) {
      value[Keys.fullName] = true
    }
  }

  /**
   * Converts values to string, if they are of type number
   *
   * Преобразовывает значения в строку, если являются типом число
   * @param {Object<string, *>|string|number} value values for conversion / значения для преобразования
   */
  static valueToString (value) {
    if (typeof value.value === 'number') {
      value.value = value.value.toString()
    }
  }
}
