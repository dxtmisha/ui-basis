'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ImageCalculation = void 0
const vue_1 = require('vue')
/**
 * Class for managing calculations for a specific group
 *
 * Класс для управления вычислениями для конкретной группы
 */
class ImageCalculation {
  name
  factorMax = (0, vue_1.ref)(1)
  size = {
    width: 0,
    height: 0
  }

  offset = {
    width: 7680,
    height: 7680
  }

  /**
     * Constructor
     * @param name group name / название группы
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (name) {
    this.name = name
  }

  /**
     * Checks if this object matches its name
     *
     * Проверяет, подходит ли этот объект по его имени
     * @param name name of the checked group / название проверяемой группы
     */
  is (name) {
    return this.name === name
  }

  /**
     * Если у элемента есть размер
     *
     * If the element has a size
     */
  isSize () {
    return !!(this.size.width || this.size.width)
  }

  /**
     * Returns the maximum value allowed for scaling
     *
     * Возвращает максимальное значение, допустимое для масштабирования
     */
  getFactorMax () {
    return this.factorMax.value
  }

  /**
     * Returns the physical width
     *
     * Возвращает физическую ширину
     */
  getWidth () {
    return this.size.width
  }

  /**
     * Returns the physical height
     *
     * Возвращает физическую высоту
     */
  getHeight () {
    return this.size.height
  }

  /**
     * Returns the actual width
     *
     * Возвращает фактическую ширину
     */
  getOffsetWidth () {
    return this.offset.width
  }

  /**
     * Returns the actual height
     *
     * Возвращает фактическую высоту
     */
  getOffsetHeight () {
    return this.offset.height
  }

  /**
     * Changes the scaling value if it is greater than the checked value
     *
     * Изменения значения масштабирования, если он больше проверяемой значения
     * @param value values for verification / значения для проверки
     */
  setFactorMax (value) {
    if (value < this.factorMax.value) {
      this.factorMax.value = value
    }
    return this
  }

  /**
     * Updating size.width, if it is larger than the selected value
     *
     * Обновление size.width, если она больше выбранного значения
     * @param width value of the selected width / значение выбранной ширины
     */
  setWidth (width) {
    if (width > this.size.width) {
      this.size.width = width
    }
    return this
  }

  /**
     * Updating size.height, if it is larger than the selected value
     *
     * Обновление size.height, если она больше выбранного значения
     * @param height value of the selected height / значение выбранной высоты
     */
  setHeight (height) {
    if (height > this.size.height) {
      this.size.height = height
    }
    return this
  }

  /**
     * Updating offset.width, if it is larger than the selected value
     *
     * Обновление offset.width, если она больше выбранного значения
     * @param width value of the selected width / значение выбранной ширины
     */
  setOffsetWidth (width) {
    if (width < this.offset.width) {
      this.offset.width = width
    }
    return this
  }

  /**
     * Updating offset.height, if it is larger than the selected value
     *
     * Обновление offset.height, если она больше выбранного значения
     * @param height value of the selected height / значение выбранной высоты
     */
  setOffsetHeight (height) {
    if (height < this.offset.height) {
      this.offset.height = height
    }
    return this
  }

  /**
     * Restoring the value to its original state
     *
     * Восстановление значения в изначальное состояние
     */
  reset () {
    this.factorMax.value = 1
    this.size = {
      width: 0,
      height: 0
    }
    this.offset = {
      width: 7680,
      height: 7680
    }
    return this
  }
}
exports.ImageCalculation = ImageCalculation
// # sourceMappingURL=ImageCalculation.js.map
