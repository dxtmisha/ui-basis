const {
  isFilled,
  isObject,
  splice
} = require('../../../../functions/data')
const { To } = require('../../../To')

const Keys = require('../PropertiesKeys')
const Type = require('../PropertiesType')

const FILE_CACHE = '004-link'
const USED_TYPE = [
  Type.link,
  Type.var,
  Type.property,
  Type.selector,
  Type.virtual
]

const MAX = 24
const MAX_PARENT = 12

/**
 * The method for changing all links
 *
 * Метод для изменения всех ссылок
 */
module.exports = class PropertiesToLink {
  __update = 1
  __updateList = {}
  __ignore = {}

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
    let max = MAX

    while (
      this.__update > 0 &&
      max-- > 0) {
      this.__update = 0
      this.__to()
    }

    this.items.createStep(FILE_CACHE)
  }

  __to (
    design = undefined,
    component = undefined,
    properties = this.items.get(),
    parent = []
  ) {
    const list = []
    let expect = false

    if (parent.length > MAX_PARENT) {
      return expect
    }

    for (const [name, item] of Object.entries(properties)) {
      const parentItem = [...parent, name]

      if (
        this.__isType(item) &&
        this.__isValue(item) &&
        this.__ignore?.[item.value] !== true
      ) {
        const link = this.items.toFullLink(design, component, item.value)
        const data = this.items.getFullItemByIndex(link)

        if (data) {
          if (this.__isData(data.item)) {
            if (
              this.__updateList?.[link] !== true &&
              this.__to(
                data.design,
                data.component,
                data?.value,
                parentItem
              )
            ) {
              expect = true
              break
            } else {
              this.__updateList[link] = true
              this.__update++

              list.push({
                properties,
                name,
                data: data.value
              })
            }
          } else {
            this.__ignore[item.value] = true
          }
        } else {
          expect = true
          break
        }
      } else if (
        isFilled(item?.value) &&
        isObject(item?.value) &&
        this.__to(
          design || name,
          design && (component || name),
          item?.value,
          parentItem
        )
      ) {
        expect = true
      }
    }

    this.__add(list)
    return expect
  }

  /**
   * Checks for compliance by type
   *
   * Проверяет на соответствие по типу
   * @param {*} item current element / текущий элемент
   * @return {boolean}
   * @private
   */
  __isType (item) {
    return !item?.[Keys.type] || USED_TYPE.indexOf(item[Keys.type]) !== -1
  }

  /**
   * Checks whether a value is a reference
   *
   * Проверяет, является ли значение ссылкой
   * @param {*} item current element / текущий элемент
   * @return {boolean}
   */
  __isValue (item) {
    return typeof item?.value === 'string' &&
      item.value.match(/^{[^{}]+}$/) &&
      !item.value.match(/[{?.]sys/)
  }

  /**
   * Проверяет, подходить ли данный под условия ссылка
   * @param {Object<string,*>} item current element / текущий элемент
   * @return {boolean}
   * @private
   */
  __isData (item) {
    return typeof item?.value === 'object' &&
      Object.keys(item.value).length > 0
  }

  /**
   * Adds new entries
   *
   * Добавляет новые записи
   * @param {{
   *   properties: Object<string,*>,
   *   name: string,
   *   data: Object<string,*>
   * }[]} list
   * @private
   */
  __add (list) {
    list.forEach(({
      properties,
      name,
      data
    }) => splice(
      properties,
      To.copy(data),
      name,
      true
    ))
  }
}
