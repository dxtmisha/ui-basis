const {
  forEach,
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
   * Returns a broken list of names by name
   *
   * Возвращает разбитый список названий по имени
   * @param {string} name property names / названия свойств
   * @param {string} key the key by which to find a match / ключ, по которому нужно найти сходство
   * @return {string[]}
   * @private
   */
  __getNameList (name, key) {
    return name.split(this.__getSeparator(key))
  }

  /**
   * Returns an object with updated values, taking into account its location
   *
   * Возвращает объект с обновленными значениями, учитывая его местоположение
   * @param {Object<string,*>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @param value new values for the properties / новые значения для свойств
   * @return {(*&{value})|*}
   * @private
   */
  __getPropertiesByValue (properties, value) {
    if (properties?.value) {
      return {
        ...properties,
        value
      }
    } else {
      return value
    }
  }

  /**
   * Returns the delimiter key
   *
   * Возвращает ключ разделения
   * @param {string} key the key by which to find a match / ключ, по которому нужно найти сходство
   * @return {string}
   * @private
   */
  __getSeparator (key) {
    return key || READ_SEPARATOR
  }

  /**
   * Returns the values by which to remove unnecessary characters.
   *
   * Возвращает значения, по которым удаляем лишние символы.
   * @param {string} value values to be deleted / значения для удаления
   * @return {string}
   * @private
   */
  __getSimplification (value) {
    return value || READ_SIMPLIFICATION
  }

  /**
   * Checks if the property is suitable for splitting
   *
   * Проверяет, подходит ли свойство для разделения
   * @param {string} name property names / названия свойств
   * @param {string} key the key by which to find a match / ключ, по которому нужно найти сходство
   * @return {boolean}
   * @private
   */
  __isSeparator (name, key) {
    return !!name.match(this.__getSeparator(key))
  }

  /**
   * Начало преобразования
   * @param {Object<string,*>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @return {*}
   */
  __toGo (properties) {
    const keySeparator = PropertiesTool.getKeySeparator()
    const keySimplification = PropertiesTool.getKeySimplification()
    let newProperties = {}

    forEach(PropertiesTool.getValue(properties), (item, name) => {
      const separator = item?.[keySeparator]
      const newItem = typeof item === 'object' ? this.__toGo(item) : item

      if (this.__isSeparator(name, separator)) {
        const list = this.__getNameList(
          this.__toSimplification(
            name,
            separator,
            item?.[keySimplification]
          ),
          separator
        )

        newProperties = replaceRecursive(newProperties, this.__toWrap(list, newItem))
      } else {
        newProperties[name] = newItem
      }
    })

    return this.__getPropertiesByValue(properties, newProperties)
  }

  /**
   * Removing unnecessary characters from the name
   *
   * Удаление лишних символов из названия
   * @param {string} name property names / названия свойств
   * @param {string} key the key by which to find a match / ключ, по которому нужно найти сходство
   * @param {string} value values to be deleted / значения для удаления
   * @return {string}
   * @private
   */
  __toSimplification (name, key, value) {
    const separator = this.__getSeparator(key)

    return name
      .replaceAll(`${separator}${this.__getSimplification(value)}`, '')
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
        typeof values === 'object'
      ) {
        data.quantity++
        this.__addSelectorsItem(data.items, item)
      }
    })

    return data
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
    const values = PropertiesTool.getValue(properties)

    forEach(values, (item, name) => {
      const value = PropertiesTool.getValue(item)

      if (typeof value !== 'object') {
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
