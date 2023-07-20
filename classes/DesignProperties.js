'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.DesignProperties = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
const EXCEPTIONS = [
  'focus',
  'readonly',
  'disabled'
]
/**
 * A class for working with basic properties from tokens
 *
 * Класс для работы с базовыми свойствами из токенов
 */
class DesignProperties {
  item = (0, vue_1.ref)([])
  /**
     * Returns all properties
     *
     * Возвращает все свойства
     */
  get () {
    return this.item.value
  }

  /**
     * Returns a Ref object with all properties
     *
     * Возвращает объект Ref со всеми свойствами
     */
  getItem () {
    return this.item
  }

  /**
     * Getting a property by its name
     *
     * Получаем свойство по его имени
     * @param name property names / названия свойств
     */
  getByName (name) {
    return this.item.value.find(item => item.name === name)
  }

  /**
     * Returns a list of properties by category
     *
     * Возвращает список свойств по категории
     * @param category category name / название категории
     */
  getByCategory (category) {
    return this.item.value.filter(item => item?.category === category)
  }

  /**
     * Gets a property by its name or returns the property if the input is the property itself
     *
     * Получает свойство по его имени или возвращает свойство, если на входе является само свойство
     * @param nameItem property names or the property instance itself / названия свойств
     * или сам экземпляр свойства
     */
  getOrItem (nameItem) {
    return typeof nameItem === 'string'
      ? this.getByName(nameItem)
      : nameItem
  }

  /**
     * Returns the category name of the property
     *
     * Возвращает название категории у свойства
     * @param nameItem property names or the property instance itself / названия свойств
     * или сам экземпляр свойства
     */
  getCategoryName (nameItem) {
    const item = this.getOrItem(nameItem)
    return item && 'category' in item ? item.category : undefined
  }

  /**
     * Property modification
     *
     * Изменение свойства
     * @param properties list of properties / список свойств
     */
  set (properties) {
    if (Array.isArray(properties)) {
      this.item.value = properties
    }
    return this
  }

  /**
     * Checks if the property has a default value
     *
     * Проверяет, есть ли у свойства значение по умолчанию
     * @param nameItem property names or the property instance itself / названия свойств
     * или сам экземпляр свойства
     */
  isDefault (nameItem) {
    const item = this.getOrItem(nameItem)
    return !!(item &&
            'default' in item &&
            item.default)
  }

  /**
     * Checks if the value is a standard property
     *
     * Проверяет, является ли значение стандартным свойством
     * @param nameItem property names or the property instance itself / названия свойств
     * или сам экземпляр свойства
     * @param value property values / значения свойства
     */
  isValue (nameItem, value) {
    const item = this.getOrItem(nameItem)
    return !!(item &&
            (0, data_1.isFilled)(value) &&
            item?.value?.indexOf(value) !== -1)
  }

  /**
     * Checks if the property is available for styling
     *
     * Проверяет, доступно ли свойство для применения стиля
     * @param nameItem property names or the property instance itself / названия свойств
     * или сам экземпляр свойства
     * @param value property values / значения свойства
     */
  isStyle (nameItem, value) {
    const item = this.getOrItem(nameItem)
    return !!(item &&
            (0, data_1.isFilled)(value) &&
            'style' in item &&
            item?.style === true &&
            item?.valueAll?.indexOf(value) === -1)
  }

  /**
     * Checks if the property value is true
     *
     * Проверяет, если у свойства значение true
     * @param nameItem property names or the property instance itself / названия свойств
     * или сам экземпляр свойства
     */
  isBool (nameItem) {
    const item = this.getOrItem(nameItem)
    return !!(item &&
            'valueAll' in item &&
            item?.valueAll?.indexOf(true) !== -1)
  }

  /**
     * This checks if an exception belongs to a rule
     *
     * Проверяет, является ли исключение из правила
     * @param nameItem property names or the property instance itself / названия свойств
     * или сам экземпляр свойства
     * @param value property values / значения свойства
     */
  isExceptions (nameItem, value) {
    const item = this.getOrItem(nameItem)
    return !!(item &&
            value === true &&
            EXCEPTIONS.indexOf(item?.name) !== -1)
  }
}
exports.DesignProperties = DesignProperties
// # sourceMappingURL=DesignProperties.js.map
