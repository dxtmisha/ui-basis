const { splice } = require('../../functions/data')

// const PropertiesItems = require('./PropertiesItems')
const PropertiesTool = require('./PropertiesTool')

const FILE_CACHE_SUB = 'properties-sub'
const FILE_CACHE_SUB_LINK = 'properties-sub-link'

const REG_NAME = /\{[^{}]+}/
const REG_SUB = /(?<={[^}]*?){([^{}]+)}/ig

/**
 * Class for converting all properties with sub-values
 *
 * Класс для преобразования всех свойств с под-значениями
 */
module.exports = class PropertiesToSub {
  /**
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
    this.__getList()
      .forEach(property => {
        if (property.isName) {
          this.__toName(property)
        }

        if (property.isValue) {
          this.__toValue(property)
        }
      })

    this.items.cache(FILE_CACHE_SUB)

    return this
  }

  /**
   * Converts only elements with the type of 'link'
   *
   * Преобразовывает только элементы с типом 'link'
   * @return {this}
   */
  toByLink () {
    const key = PropertiesTool.getKeyVariable()

    this.__getList()
      .forEach(property => {
        if (
          property.isValue &&
          property.item[key] === 'link'
        ) {
          this.__toValue(property)
        }
      })

    this.items.cache(FILE_CACHE_SUB_LINK)

    return this
  }

  /**
   * Checks if a value is part of the name
   *
   * Проверяет, является ли значение частью имени
   * @param {string} name base property name / базовое название свойства
   * @return {boolean}
   * @private
   */
  __isName (name) {
    return !!name.match(REG_NAME)
  }

  /**
   * Checks if a value has a sub-value
   *
   * Проверяет, есть ли у значения под-значения
   * @param {string} value values of properties from the value field / значения свойств из поля value
   * @return {boolean}
   * @private
   */
  __isValue (value) {
    return typeof value !== 'object' && !!value.match(REG_SUB)
  }

  /**
   * Returns values with sub-values
   *
   * Возвращает значения с под-значениями
   * @return {{
   *   item: {value:string,__variable:string},
   *   name: string,
   *   design: string,
   *   component: string,
   *   properties: Object<string,*>,
   *   isName: boolean,
   *   isValue: boolean
   * }[]}
   * @private
   */
  __getList () {
    return this.items.each(property => {
      const isName = this.__isName(property.name)
      const isValue = this.__isValue(property.item.value)

      if (isName || isValue) {
        return {
          ...property,
          isName,
          isValue
        }
      }
    })
  }

  /**
   * Converting all indices to values for a field of names
   *
   * Преобразование всех индексов в значения для поля названий
   * @param {{
   *   item: {value:string,__variable:string},
   *   name: string,
   *   design: string,
   *   component: string,
   *   properties: Object<string,*>,
   *   isName: boolean,
   *   isValue: boolean
   * }} property object for conversion / объект для преобразования
   * @private
   */
  __toName (property) {
    const designs = this.items.getDesigns()
    const name = this.__toGo('{' + PropertiesTool.toFull(
      property.name,
      property.design,
      property.component,
      designs
    ) + '}').replace(/^\{|}$/ig, '')

    splice(property.properties?.value, { [name]: property.item }, property.name, true)
  }

  /**
   * Converting all indices to values for a field of values
   *
   * Преобразование всех индексов в значения для поля значения
   * @param {{
   *   item: {value:string,__variable:string},
   *   name: string,
   *   design: string,
   *   component: string,
   *   properties: Object<string,*>,
   *   isName: boolean,
   *   isValue: boolean
   * }} property object for conversion / объект для преобразования
   * @private
   */
  __toValue (property) {
    const designs = this.items.getDesigns()
    const ketFull = PropertiesTool.getKeyFullValue()

    property.item.value = this.__toGo(
      PropertiesTool.toFull(
        property.item.value,
        property.design,
        property.component,
        designs
      )
    )

    if (property.item?.[ketFull]) {
      property.item.value = property.item.value.replace(/[{}]/g, '')
    }
  }

  /**
   * Converting all indices to values
   *
   * Преобразование всех индексов в значения
   * @param {string} value values of properties from the value field / значения свойств из поля value
   * @private
   */
  __toGo (value) {
    let max = 24
    let update = true

    while (update && max-- > 0) {
      update = false
      value = value
        .replace(REG_SUB, (all, index) => {
          update = true
          return this.items.getItemByIndex(index)?.value || index
        })
    }

    return value.trim()
  }
}
