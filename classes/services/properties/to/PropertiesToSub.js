const Keys = require('../PropertiesKeys')

const REG_SUB = /(?<={[^}]*?){([^{}]+)}/g
const FILE_CACHE = '006-sub'

/**
 * Class for converting all properties with sub-values
 *
 * Класс для преобразования всех свойств с под-значениями ({..{??name}..})
 */
module.exports = class PropertiesToSub {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Converting all elements
   *
   * Преобразование всех элементов
   * @return {this}
   */
  to () {
    this.items.each(property => {
      if (this.__is(property.value)) {
        this.__to(property)
      }
    })

    this.items.createStep(FILE_CACHE)
  }

  /**
   *
   * @param {*} value
   * @return {boolean}
   * @private
   */
  __is (value) {
    return typeof value === 'string' && !!value.match(REG_SUB)
  }

  /**
   * Converting all indices to values for a field of values
   *
   * Преобразование всех индексов в значения для поля значения
   * @param {{
   *   design: string,
   *   component: string,
   *   name: string,
   *   index: string,
   *   item: Object<string,*>,
   *   parents: Object<string,*>
   * }} property object for conversion / объект для преобразования
   * @private
   */
  __to ({
    design,
    component,
    item
  }) {
    item.value = this.__toValue(design, component, item.value)

    if (item?.[Keys.fullValue]) {
      item.value = item.value.replace(/[{}]/g, '')
    }
  }

  /**
   * Converting all indices to values
   *
   * Преобразование всех индексов в значения
   * @param {string} design design name / название дизайна
   * @param {string} component component name / название компонента
   * @param {string} value values of properties from the value field / значения свойств из поля value
   * @private
   */
  __toValue (design, component, value) {
    let max = 24
    let update = true

    while (update && max-- > 0) {
      update = false

      value = value.replace(REG_SUB, (name, value) => {
        update = true

        return this.items.getItemByIndex(
          this.items.toFullLink(design, component, name)
        )?.value || value
      })
    }

    return value.trim()
  }
}
