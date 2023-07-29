const { isFilled } = require('../../../../functions/data')
const { To } = require('../../../To')

const Keys = require('../PropertiesKeys')
const Type = require('../PropertiesType')

const REG_VAR = /\{([^{}]+)}/ig

const FILE_CACHE = '020-var'

/**
 * A class for working with custom properties in CSS
 *
 * Класс для работы с пользовательским свойством в CSS
 */
module.exports = class PropertiesToVar {
  type = Type.var
  cacheName = FILE_CACHE

  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  to () {
    this.items.findVariable(this.type).forEach(({
      design,
      component,
      name,
      value,
      item,
      parents
    }) => {
      if (isFilled(value) && typeof value === 'string') {
        const fullValue = item?.[Keys.css] || this.items.toFullLink(design, component, value)

        item[Keys.name] = this.__getName(name, item, parents)
        item[Keys.css] = this.__toValue(
          this.__toCalculator(fullValue), item?.[Keys.default]
        )

        if (item?.[Keys.important]) {
          item[Keys.css] += ' !important'
        }
      }
    })

    this.items.createStep(this.cacheName)
  }

  /**
   * Name transformation for the var type
   *
   * Преобразование имени для типа var
   * @param {string} name base property name / базовое название свойства
   * @param {Object<string,*>} item current element / текущий элемент
   * @param {{name:string,item:Object<string,*>}[]} parents array of all ancestor properties
   * along the tree from the top level / массив со всеми свойствами предков по дереву от верхнего уровня
   * @return {string}
   * @private
   */
  __getName (name, item, parents) {
    if (item?.[Keys.fullName]) {
      return `--${name}`
    } else {
      return `--${this.items.getParentsName(parents, [Type.var]).join('-')}-${name}`
    }
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
    if (value.match('{')) {
      return value.replace(REG_VAR, (all, index) => {
        if (defaultValue) {
          return `var(--${this.__toLink(index)}, ${this.__toValue(this.__toCalculator(defaultValue))})`
        } else {
          return `var(--${this.__toLink(index)})`
        }
      })
    } else {
      return value
    }
  }

  /**
   * Returns the transformed pointer
   *
   * Возвращает преобразованный указатель
   * @param {string} value values to process / значения для преобразования
   * @return {string}
   * @private
   */
  __toLink (value) {
    return To.kebabCase(
      value.replace(/\./ig, '-')
    )
  }
}
