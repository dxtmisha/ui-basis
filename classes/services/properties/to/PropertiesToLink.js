const {
  getColumn,
  splice,
  forEach
} = require('../../../../functions/data')
const { To } = require('../../../To')

// const Keys = require('../PropertiesKeys')
// const Tool = require('../PropertiesTool')
// const Type = require('../PropertiesType')

const FILE_CACHE = '004-link'

/**
 * The method for changing all links
 *
 * Метод для изменения всех ссылок
 */
module.exports = class PropertiesToLink {
  /**
   * @type {{
   *   name: string,
   *   item: Object<string,*>,
   *   parent: Object<string,*>,
   *   parents: Object<string,*>[],
   *   link: Object<string,*>
   * }[]}
   */
  list

  /**
   * Constructor
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
    let max = 24

    this.list = this.__initList()

    while (this.list.length > 0 && max-- > 0) {
      const list = []

      this.list.forEach(item => {
        if (!this.__add(item)) {
          list.push(item)
        }
      })

      this.list = list
    }

    this.items.createStep(FILE_CACHE)
  }

  __to () {
    // forEach(this.items.get(), item => {

    // })
  }

  /**
   * Transformation
   *
   * Преобразование
   * @param {{
   *   name: string,
   *   item: Object<string,*>,
   *   parent: Object<string,*>,
   *   parents: Object<string,*>[],
   *   link: Object<string,*>
   * }} data object for conversion / объект для преобразования
   * @return {boolean}
   * @private
   */
  __add ({
    name,
    parent,
    link
  }) {
    let update = false

    if (this.__isNotSubLink(link)) {
      update = true

      splice(
        parent?.value,
        To.copy(link.value),
        name,
        true
      )
    }

    return update
  }

  /**
   * Checks if the sub-element has a link
   *
   * Проверяет, есть ли у под-элемента ссылка
   * @param {Object<string,*>} link selected link / выбранная ссылка
   * @return {boolean}
   * @private
   */
  __isNotSubLink (link) {
    for (const { parents } of this.list) {
      if (parents.indexOf(link) !== -1) {
        console.log('[Sub]', link)
        return false
      }
    }

    return true
  }

  /**
   * Returns data for processing by reference
   *
   * Возвращает данные для обработки по ссылке
   * @return {{
   *   name: string,
   *   item: Object<string,*>,
   *   parent: Object<string,*>,
   *   parents: Object<string,*>[],
   *   link: Object<string,*>
   * }[]}
   * @private
   */
  __initList () {
    return this.items.each(property => {
      const link = this.__getItemByLink(property)

      if (link) {
        return {
          name: property.name,
          item: property.item,
          parent: property.parent,
          parents: getColumn(property.parents, 'item'),
          link
        }
      } else {
        return undefined
      }
    })
  }

  /**
   * Checks whether a reference points to the specified object
   *
   * Проверяет, указывает ли ссылка на указанный объект
   * @param {string} design design name / название дизайна
   * @param {string} component component name / название компонента
   * @param {Object<string,*>} item current element / текущий элемент
   * @return {Object<string,*>|undefined}
   * @private
   */
  __getItemByLink ({
    design,
    component,
    item
  }) {
    if (this.__isValue(item?.value)) {
      const data = this.items.getItemByIndex(
        this.items.toFullLink(design, component, item.value)
      )

      if (
        data &&
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
   * @param {*} value current element / текущий элемент
   * @return {boolean}
   */
  __isValue (value) {
    return typeof value === 'string' &&
      value.match(/^{[^{}]+}$/) &&
      !value.match(/[{?.]sys/)
  }
}
