const {
  forEach,
  isFilled,
  replaceRecursive
} = require('../../functions/data')

const PropertiesTool = require('./PropertiesTool')

/**
 * A class for transforming a property into a basic structure for work
 *
 * Класс для преобразования свойства в базовую структуру для работы
 */
module.exports = class PropertiesReadStandard {
  /**
   * Transforms an array into the required data structure
   *
   * Преобразует массив в нужную структуру
   * @param {Object<string,*>|{}} properties an array that needs to be
   * transformed / массив, который нужно преобразовать
   * @return {Object<string,Object<string,*>>}
   */
  to (properties) {
    const keyVariable = PropertiesTool.getKeyVariable()
    const data = {}

    forEach(properties, (item, name) => {
      const key = PropertiesTool.getName(name)
      const variable = PropertiesTool.getVariableInName(name)
      const value = this.__toStandardByItem(item, key)
      const newKey = this.__reKeyName(key, variable || value?.[keyVariable])

      if (typeof value === 'object') {
        if (newKey in data) {
          data[newKey] = replaceRecursive(data[newKey], value)
        } else {
          data[newKey] = value
        }

        if (variable) {
          data[newKey][keyVariable] = variable
        }

        if (PropertiesTool.isFull(name)) {
          data[newKey][PropertiesTool.getKeyFull()] = true
        }

        if (typeof data[newKey]?.value === 'number') {
          data[newKey].value = data[newKey].value.toString()
        }
      } else {
        data[newKey] = value
      }
    })

    return data
  }

  /**
   * Returns a new key
   *
   * Возвращает новый ключ
   * @param {string} key property name / название свойства
   * @param {string|undefined} variable тип свойство
   * @return {string}
   * @private
   */
  __reKeyName (key, variable) {
    switch (variable) {
      case 'media':
      case 'media-max':
        if (!key.match(/^media-/)) {
          return `media-${key}`
        }
        break
    }

    // TODO: проверить еще раз
    // return PropertiesTool.toIndex(key)
    return key
  }

  /**
   * Transform the property value into the required format
   *
   * Преобразовать значение свойства в необходимый формат
   * @param {Object<string, *>|string|number} value values for conversion / значения для преобразования
   * @param {string} name property name / название свойства
   * @return {Object<string, *>}
   * @private
   */
  __toStandardByItem (value, name) {
    if (PropertiesTool.isSpecial(name)) {
      return value
    } else if (typeof value !== 'object') {
      return { value }
    } else if ('value' in value) {
      if (typeof value.value === 'object') {
        return {
          ...value,
          value: this.to(value.value)
        }
      } else {
        return value
      }
    } else if (Object.keys(value).length === 0) {
      return { value: {} }
    } else if (isFilled(value)) {
      return this.__toSeparate(this.to(value))
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
  __toSeparate (properties) {
    const value = {}
    const special = {}

    forEach(properties, (item, name) => {
      if (PropertiesTool.isSpecial(name)) {
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
}
