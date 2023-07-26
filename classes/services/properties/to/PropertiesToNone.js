const {
  forEach,
  isFilled,
  isObject
} = require('../../../../functions/data')

/**
 * Class for cleaning all empty entries for clothing the array
 *
 * Класс для очистки всех пустых записей для облечения массива
 */
module.exports = class PropertiesToNone {
  /**
   * Removes all empty entries from the data
   *
   * Удаляет у данных всех пустых записей
   * @param {Object<string,{value:*}>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   */
  static to (properties) {
    return this.__to(properties)
  }

  /**
   * Removes all empty entries from the data
   *
   * Удаляет у данных всех пустых записей
   * @param {Object<string,{value:*}>} properties An array that needs to be
   * @param {string} path path to the current value / путь к текущему значению
   * transformed / Массив, который нужно преобразовать
   */
  static __to (properties, path = '') {
    forEach(properties, (item, name) => {
      if (isObject(item) && 'value' in item) {
        if (isFilled(item?.value)) {
          this.__to(item?.value, `${path}.${name}`)
        }

        if (!isFilled(item?.value)) {
          console.error('[None]', path, name, item?.value)
          delete properties[name]
        }
      }
    })
  }
}
