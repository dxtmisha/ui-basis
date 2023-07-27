const Keys = require('../PropertiesKeys')
const Type = require('../PropertiesType')

module.exports = class PropertiesToLink {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Checks whether a reference points to the specified object
   *
   * Проверяет, указывает ли ссылка на указанный объект
   * @param {string} design design name / название дизайна
   * @param {string} component component name / название компонента
   * @param {Object<string,*>} item current element / текущий элемент
   * @return {string|undefined}
   * @private
   */
  __getItemByLink (
    design,
    component,
    item
  ) {
    if (this.__isValue(item?.value)) {
      const data = this.items.getItemByIndex(
        this.items.toFullLink(design, component, item.value)
      )

      if (
        typeof data?.value === 'object' &&
        Object.keys(data.value).length > 0
      ) {
        return data
      }
    }

    return undefined
  }

  /**
   * Checks whether a value is a reference
   *
   * Проверяет, является ли значение ссылкой
   * @param {Object<string,*>} item current element / текущий элемент
   * @return {boolean}
   */
  __isValue (item) {
    return typeof item?.value === 'string' && (
      item?.[Keys.type] === Type.link || (
        !!item.value.match(/^{[^{}]+}$/) &&
        !item.value.match(/[{?.]sys/)
      )
    )
  }
}
