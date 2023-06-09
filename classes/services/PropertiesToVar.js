const { To } = require('../To')

// const PropertiesItems = require('./PropertiesItems')
const PropertiesTool = require('./PropertiesTool')
const { isFilled } = require('../../functions/data')

const REG_VAR = /\{([^{}]+)}/ig

const FILE_CACHE_VAR = 'properties-var'
const FILE_CACHE_VAR_STRING = 'properties-string'
const FILE_CACHE_VAR_IMPORTANT = 'properties-var-important'

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
    const keyCss = PropertiesTool.getKeyCss()
    const keyDefault = PropertiesTool.getKeyDefault()

    this.__getList().forEach(item => {
      item[keyCss] = this.__toValue(this.__toCalculator(item.value), item[keyDefault])
    })

    this.items.cache(FILE_CACHE_VAR)

    return this
  }

  /**
   * Converting empty properties to string
   *
   * Преобразование пустых свойств в строку
   */
  toString () {
    const keyVariable = PropertiesTool.getKeyVariable()
    this.items.each(({ item }) => {
      if (
        ['var', 'property'].indexOf(item?.[keyVariable]) !== -1 &&
        typeof item.value !== 'string' &&
        !isFilled(item.value)
      ) {
        item.value = ''
      }
    })
  }

  /**
   * Converts all values for use in CSS
   *
   * Добавляет в значения important
   * @return {this}
   */
  toImportant () {
    const keyCss = PropertiesTool.getKeyCss()
    const keyImportant = PropertiesTool.getKeyImportant()

    this.items.each(({ item }) => {
      if (item[keyImportant]) {
        item[keyCss] = `${item[keyCss] || item.value} !important`
      }
    })

    this.items.cache(FILE_CACHE_VAR_IMPORTANT)

    return this
  }

  /**
   * Converts all labels to the full format
   *
   * Преобразует все метки в полный формат
   * @return {this}
   */
  toFull () {
    const keyCss = PropertiesTool.getKeyCss()

    this.items.each(({
      item,
      design,
      component
    }) => {
      const value = item?.[keyCss] || item?.value

      if (
        typeof value === 'string' &&
        PropertiesTool.isMarkFull(value)
      ) {
        item[keyCss] = PropertiesTool.toFullForName(value, design, component)
      }
    })

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
   * @param {string} value values to process / значения для преобразования
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
   * @param {string} value values to process / значения для преобразования
   * @param {string} defaultValue default values / значения по умолчанию
   * @return {string}
   * @private
   */
  __toValue (value, defaultValue = undefined) {
    return value.replace(REG_VAR, (all, index) => {
      if (defaultValue) {
        return `var(--${this.__getValue(index)}, ${this.__toValue(this.__toCalculator(defaultValue))})`
      } else {
        return `var(--${this.__getValue(index)})`
      }
    })
  }

  /**
   * Checks if the value has a mathematical expression
   *
   * Проверяет, есть ли у значения математическое выражение
   * @param {string} value values to process / значения для преобразования
   * @return {string}
   * @private
   */
  __toCalculator (value) {
    if (
      value.match(/([+*/]|(?<![\w-])-(?![\w-]))/ig) &&
      value.match(/calc/ig) === null
    ) {
      return `calc(${value})`
    } else {
      return value
    }
  }
}
