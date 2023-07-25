const {
  forEach,
  isObject,
  isFilled
} = require('../../../functions/data')

const Keys = require('./PropertiesKeys')

/**
 * A class for moving data up the level, if the property is used in all records at the same level
 *
 * Класс для переноса данных выше по уровню, если свойство используется во всех записях на одном уровне
 */
module.exports = class PropertiesWrap {
  /**
   * Drag the duplicate properties to the top level to reduce the record
   *
   * Перетаскивает дублирующиеся свойства на верхний уровень для уменьшения записи
   * @param {Object<string,*>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   */
  static to (properties) {
    if (
      isFilled(properties) &&
      isObject(properties)
    ) {
      forEach(properties, item => {
        if (item?.[Keys.wrap]) {
          const selectors = this.__getSelectors(item?.value)

          if (selectors.quantity > 1) {
            forEach(selectors.properties, (property, name) => {
              if (name in item.value) {
                this.__removeProperties(property?.values?.[item.value[name]?.value], name)
              } else if (property.quantity === selectors.quantity) {
                const repeat = this.__getMaxRepeat(property.values)

                if (repeat) {
                  item.value[name] = {
                    ...repeat.item[0]?.[name],
                    value: repeat.value
                  }

                  this.__removeProperties(repeat.item, name)
                }
              }
            })
          }

          delete item[Keys.wrap]
        }

        this.to(item?.value)
      })
    }
  }

  /**
   * The method processes the properties and returns all the names of the property and its values
   *
   * Метод обрабатывает свойства и возвращает все названия свойства и его значения
   * @param {Object<string,*>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @return {{
   *   properties: Object<string, {
   *     values: Object<string,*[]>,
   *     quantity: number
   *   }>,
   *   quantity: number
   * }}
   * @private
   */
  static __getSelectors (properties) {
    const data = {
      properties: {},
      quantity: 0
    }

    forEach(properties, item => {
      if (isObject(item?.value)) {
        data.quantity++
        this.__addItem(data.properties, item?.value)
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
   * @param {Object<string,{value:*}>} properties list of properties / свойств
   * @private
   */
  static __addItem (data, properties) {
    forEach(properties, (item, name) => {
      if (typeof item?.value === 'string') {
        const selector = this.__getSelector(data, name)
        const values = this.__getValue(selector, item.value)

        selector.quantity++
        values.push(properties)
      }
    })
  }

  /**
   * Adds a new property if it does not exist and returns an object to work with this property
   *
   * Добавляет новое свойство, если его нет, и возвращает объект для работы с этим свойством
   * @param {Object<string, {
   *   values: Object<string,*[]>,
   *   quantity: number
   * }>} data object with all the collected data / объект со всеми собранными данными
   * @param {string} name the name of the property / название свойства
   * @return {{
   *   values: Object<string,*[]>,
   *   quantity: number
   * }}
   * @private
   */
  static __getSelector (data, name) {
    if (!(name in data)) {
      data[name] = {
        values: {},
        quantity: 0
      }
    }

    return data[name]
  }

  /**
   * Adds values to the current property and returns an array for adding a data source
   *
   * Добавляет значения к текущему свойству и возвращает массив для добавления источника данных
   * @param {{
   *   values: Object<string,*[]>,
   *   quantity: number
   * }} selector an object to work with the current property / объект для работы с текущим свойством
   * @param {string} value the value of the property / значение свойства
   * @return {*[]}
   * @private
   */
  static __getValue (selector, value) {
    if (!(value in selector.values)) {
      selector.values[value] = []
    }

    return selector.values[value]
  }

  /**
   * Returns values with maximum repetitions
   *
   * Возвращает значения с максимальными повторами
   * @param {Object<string,*[]>} properties values for verification / значения для проверки
   * @return {{
   *   value: string,
   *   item: *[]
   * }}
   * @private
   */
  static __getMaxRepeat (properties) {
    let max = 0
    let focus

    forEach(properties, (item, value) => {
      if (
        item.length > 1 && (
          item.length > max ||
          focus === undefined
        )
      ) {
        max = item.length
        focus = {
          value,
          item
        }
      }
    })

    return focus
  }

  /**
   * Deletes all records with the property that was moved up the tree
   *
   * Удаляет все записи с свойством, которое было перенесено выше по дереву
   * @param {*[]|undefined} properties an array with properties by the same values / массив со
   * свойствами по одинаковым значениям
   * @param {string} name the name of the property for deletion / название свойства для удаления
   * @private
   */
  static __removeProperties (properties, name) {
    properties?.forEach(item => delete item[name])
  }
}
