import { ref } from 'vue'

import { ImageSizeType } from './ImageData'

/**
 * Class for managing calculations for a specific group
 *
 * Класс для управления вычислениями для конкретной группы
 */
export class ImageCalculation {
  protected readonly factorMax = ref(1)

  protected size: ImageSizeType = {
    width: 0,
    height: 0
  }

  protected offset: ImageSizeType = {
    width: 7680,
    height: 7680
  }

  /**
   * Constructor
   * @param name group name / название группы
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly name: string
  ) {
  }

  /**
   * Checks if this object matches its name
   *
   * Проверяет, подходит ли этот объект по его имени
   * @param name name of the checked group / название проверяемой группы
   */
  is (name: string): boolean {
    return this.name === name
  }

  /**
   * Если у элемента есть размер
   *
   * If the element has a size
   */
  isSize (): boolean {
    return !!(this.size.width || this.size.width)
  }

  /**
   * Returns the maximum value allowed for scaling
   *
   * Возвращает максимальное значение, допустимое для масштабирования
   */
  getFactorMax (): number {
    return this.factorMax.value
  }

  /**
   * Returns the physical width
   *
   * Возвращает физическую ширину
   */
  getWidth (): number {
    return this.size.width
  }

  /**
   * Returns the physical height
   *
   * Возвращает физическую высоту
   */
  getHeight (): number {
    return this.size.height
  }

  /**
   * Returns the actual width
   *
   * Возвращает фактическую ширину
   */
  getOffsetWidth (): number {
    return this.offset.width
  }

  /**
   * Returns the actual height
   *
   * Возвращает фактическую высоту
   */
  getOffsetHeight (): number {
    return this.offset.height
  }

  /**
   * Changes the scaling value if it is greater than the checked value
   *
   * Изменения значения масштабирования, если он больше проверяемой значения
   * @param value values for verification / значения для проверки
   */
  setFactorMax (value: number): this {
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
  setWidth (width: number): this {
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
  setHeight (height: number): this {
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
  setOffsetWidth (width: number): this {
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
  setOffsetHeight (height: number): this {
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
  reset (): this {
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
