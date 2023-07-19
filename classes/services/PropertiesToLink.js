const {
  splice,
  forEach
} = require('../../functions/data')

// const PropertiesItems = require('./PropertiesItems')
const PropertiesTool = require('./PropertiesTool')
const { To } = require('../To')

const FILE_CACHE_LINK = 'properties-link'

/**
 * The method for changing all links
 *
 * Метод для изменения всех ссылок
 */
module.exports = class PropertiesToLink {
  /**
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * The method searches for all links and replaces their values with the specified link
   *
   * Метод ищет все ссылки и заменяет значения на указанную ссылку
   */
  to () {
    const list = this.__getList()

    let max = 24
    let update = true

    while (update && max-- > 0) {
      update = false

      list.forEach(property => {
        if (!property?.update && this.__toGo(property)) {
          update = true
          property.update = true
        }
      })
    }

    this.items.cache(FILE_CACHE_LINK)
  }

  /**
   * Checks if a sub-element is a link
   *
   * Проверяет, является ли под-элемент ссылкой
   * @param {Object<string,*>} properties object for checking / объект для проверки
   * @return {boolean}
   * @private
   */
  __is (properties) {
    return this.items.each(({
      item,
      name
    }) => {
      return item[PropertiesTool.getKeyVariable()] === 'link' ? name : undefined
    }, {}, properties).length > 0
  }

  /**
   * Returns a list of all links
   *
   * Возвращает список всех ссылок
   * @return {{
   *   item?: Object<string,*>,
   *   name?: string,
   *   design?: string,
   *   component?: string,
   *   properties?: Object<string,*>
   * }[]}
   * @private
   */
  __getList () {
    return this.items.each((property) => {
      if (property.item[PropertiesTool.getKeyVariable()] === 'link') {
        return property
      } else {
        return undefined
      }
    })
  }

  /**
   * Преобразования
   * @param {{
   *   item?: Object<string,*>,
   *   name?: string,
   *   design?: string,
   *   component?: string,
   *   properties?: Object<string,*>
   * }} property object for conversion / объект для преобразования
   * @return {boolean}
   * @private
   */
  __toGo (property) {
    const index = PropertiesTool.toFull(
      property.item.value,
      property.design,
      property.component,
      this.items.getDesigns()
    )
    const properties = this.items.getItemByValue(index)
    let update = false

    properties.forEach(item => {
      if (
        !this.__is(item.property.value) &&
        typeof item.property.value === 'object'
      ) {
        update = true

        splice(
          property.properties.value,
          this.__toLink(property, item),
          property.name,
          true
        )
      }
    })

    return update
  }

  /**
   * Transforms the data matches the value of modification
   *
   * Преобразует данные соответствия значения modification
   * @param {{
   *   item?: Object<string,*>,
   *   name?: string,
   *   design?: string,
   *   component?: string,
   *   properties?: Object<string,*>
   * }} property object for conversion / объект для преобразования
   * @param {Object<string,*>} item object for transformation / объект для преобразования
   * @return {Object<string,*>}
   * @private
   */
  __toLink (property, item) {
    const keyType = PropertiesTool.getKeyType()
    const copy = To.copy(item.property.value)

    if (property.item?.[PropertiesTool.getKeyModification()] === 'link') {
      const data = {}

      forEach(copy, (value, name) => {
        data[name] = {
          value: property.item.value?.replace?.(/}$/, `.${name}}`),
          [keyType]: 'var'
        }
      })

      return data
    } else {
      return copy
    }
  }
}
