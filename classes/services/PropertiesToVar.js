// const PropertiesItems = require('./PropertiesItems')
const PropertiesTool = require('./PropertiesTool')
const { To } = require('../To')

const REG_VAR = /\{([^{}]+)}/ig

const FILE_CACHE_VAR = 'properties-var'

/**
 * Class for working with values in CSS
 *
 * Класс для работы со значениями в CSS
 */
module.exports = class PropertiesToVar {
  /**
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Converts all values for use in CSS
   *
   * Преобразует все значения для работы в CSS
   * @return {this}
   */
  to () {
    this.__getList().forEach(item => {
      item[PropertiesTool.getKeyCss()] = this.__toValue(
        this.__toCalculator(item.value)
      )
    })

    this.items.cache(FILE_CACHE_VAR)

    return this
  }

  /**
   * Returns a list of all values that have a pointer.
   *
   * Возвращает список всех значений, у которых есть указатель
   * @return {Object<string,*>[]}
   * @private
   */
  __getList () {
    const keyFix = PropertiesTool.getKeyFullValue()

    return this.items.each(({ item }) => {
      if (
        typeof item?.value === 'string' &&
        !item?.[keyFix] &&
        item.value.match(/[{]/)
      ) {
        return item
      }
    })
  }

  /**
   * Returns the transformed pointer
   *
   * Возвращает преобразованный указатель
   * @param {string} value
   * @return {string}
   * @private
   */
  __getValue (value) {
    return To.kebabCase(
      value.replace(/\./ig, '-')
    )
  }

  /**
   * Transformation to the CSS property
   *
   * Преобразование в свойство CSS
   * @param {string} value
   * @return {string}
   * @private
   */
  __toValue (value) {
    return value.replace(REG_VAR, (all, index) => `var(--${this.__getValue(index)})`)
  }

  /**
   * Checks if the value has a mathematical expression
   *
   * Проверяет, есть ли у значения математическое выражение
   * @param {string} value
   * @return {string}
   * @private
   */
  __toCalculator (value) {
    if (
      value.match(/[+\-*/]/ig) &&
      value.match(/calc/ig) === null
    ) {
      return `calc(${value})`
    } else {
      return value
    }
  }
}
