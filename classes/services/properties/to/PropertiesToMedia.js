const { forEach } = require('../../../../functions/data')

const Keys = require('../PropertiesKeys')
const Type = require('../PropertiesType')

const FILE_CACHE = '040-media'

/**
 * A class for transforming class
 *
 * Класс для преобразования class
 */
module.exports = class PropertiesToMedia {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
    this.media = this.items.getItemForMedia()
  }

  to () {
    this.items.findVariable([Type.media, Type.mediaMax]).forEach(({
      design,
      name,
      item
    }) => {
      item[Keys.name] = this.__getName(design, name, item)
    })

    this.items.createStep(FILE_CACHE)
  }

  /**
   @param {string} design design name / название дизайна
   * @param {string} name base property name / базовое название свойства
   * @param {Object<string,*>} item current element / текущий элемент
   * @return {string}
   * @private
   */
  __getName (design, name, item) {
    const values = this.__toValueForMedia(
      design,
      this.items.getItemReName(name, item).split(',')
    )

    if (values.length > 1) {
      return `(min-width: ${values?.[0] || '0px'}) and (max-width: calc(${values?.[1] || '1980px'} - 1px))`
    } else if (item?.[Keys.variable] === Type.mediaMax) {
      return `(max-width: calc(${values?.[0] || '1980px'} - 1px))`
    } else {
      return `(min-width: ${values?.[0] || '0px'})`
    }
  }

  /**
   * Updates data if the alias is entered
   *
   * Изменяет данные, если введен алиас
   * @param {string} design design name / название дизайна
   * @param {string[]} values a list of values for media / список значений для медиа
   * @return {string[]}
   * @private
   */
  __toValueForMedia (design, values) {
    return forEach(values, value => {
      const key = value.replace(/^media-/, '')
      return this.media?.[design]?.[key]?.value || key
    })
  }
}
