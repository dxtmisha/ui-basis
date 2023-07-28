const Keys = require('../PropertiesKeys')

/**
 * A class for transforming an expression through regular expressions
 *
 * Класс для преобразования выражения через регулярные выражения
 */
module.exports = class PropertiesToReplace {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Transforming all of its properties
   *
   * Преобразование всех своих свойств
   */
  to () {
    this.items.each(({ item }) => {
      if (
        item?.[Keys.replace] &&
        typeof item?.value === 'string'
      ) {
        item.value = this.__getValue(
          this.__getInfo(item[Keys.replace]),
          item.value
        )
      }
    })
  }

  /**
   * Getting information about the transformation
   *
   * Получение информации о преобразовании
   * @param {string|{
   *   pattern?: string,
   *   flags?: string,
   *   replace?: string
   * }} info information for verification / информация для проверки
   * @return {{
   *   pattern?: string,
   *   flags: string,
   *   replace: string
   * }}
   * @private
   */
  __getInfo (info) {
    if (typeof info === 'object') {
      return {
        pattern: info?.pattern,
        flags: info?.flags || 'i',
        replace: info?.replace || '$1'
      }
    } else {
      return {
        pattern: info || undefined,
        flags: 'i',
        replace: '$1'
      }
    }
  }

  /**
   * Returns the transformed value
   *
   * Возвращает преобразованное значение
   * @param {{
   *   pattern?: string,
   *   flags: string,
   *   replace: string
   * }} info information for verification / информация для проверки
   * @param {string} value
   * @return {string}
   * @private
   */
  __getValue (info, value) {
    if (info.pattern) {
      return value.replace(new RegExp(info.pattern, info.flags), info.replace)
    } else {
      return value
    }
  }
}
