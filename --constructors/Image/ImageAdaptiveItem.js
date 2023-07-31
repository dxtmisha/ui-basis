'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ImageAdaptiveItem = exports.MAX_BEYOND = void 0
const vue_1 = require('vue')
const element_1 = require('../../functions/element')
const ImageCalculationList_1 = require('./ImageCalculationList')
/**
 * Value in pixels, defining the limit beyond the screen, up to which the
 * image size is still calculated
 *
 * Значение в пикселях, определяющее предел за экраном, до которого все
 * еще вычисляется размер изображения
 */
exports.MAX_BEYOND = 256
/**
 * Class for controlling the scaling behavior of a specific element
 *
 * Класс для управления поведением масштабирования конкретного элемента
 */
class ImageAdaptiveItem {
  element
  info
  groupName
  adaptive
  adaptiveAlways
  width
  height
  percentWidth = (0, vue_1.ref)(0)
  percentHeight = (0, vue_1.ref)(0)
  /**
     * Determines whether to calculate the size of the element
     *
     * Определяет, вычислять ли размер элемента
     * @protected
     */
  beyond = false
  /**
     * Determines whether the element is visible on the user’s screen
     *
     * Определяет, виден ли элемент на экране пользователя
     * @protected
     */
  visible = false
  /**
     * Constructor
     * @param element image element for scaling / элемент изображения для масштабирования
     * @param info image data / данные изображения
     * @param groupName group name / название группы
     * @param adaptive activity status / статус активности
     * @param adaptiveAlways does the element always participate / участвует ли элемент всегда
     * @param width physical width of the object / физическая ширина объекта
     * @param height physical height of the object / физическая высота объекта
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (element, info, groupName, adaptive, adaptiveAlways, width, height) {
    this.element = element
    this.info = info
    this.groupName = groupName
    this.adaptive = adaptive
    this.adaptiveAlways = adaptiveAlways
    this.width = width
    this.height = height
  }

  /**
     * Directions for alignment
     *
     * Направления для выравнивания
     */
  type = (0, vue_1.computed)(() => {
    if (this.width.value &&
            this.percentWidth.value > 0) {
      return 'x'
    } else if (this.height.value &&
            this.percentHeight.value > 0) {
      return 'y'
    } else {
      return undefined
    }
  })

  /**
     * Calculation of the actual size of the object in scale relative to the real size
     *
     * Вычисление фактического размера объекта в масштабе относительно реального размера
     */
  size = (0, vue_1.computed)(() => {
    const element = this.element.value
    const data = this.info.value
    if (element && data) {
      switch (this.type.value) {
        case 'x':
          return data.height * (element.offsetWidth * this.percentWidth.value / data.width)
        case 'y':
          return data.width * (element.offsetHeight * this.percentHeight.value / data.height)
      }
    }
    return 0
  })

  /**
     * Multiplier, for determining the scaling of the image, corresponding to the element
     *
     * Множитель, для определения масштабирования изображения, соответствующий элементу
     */
  factor = (0, vue_1.computed)(() => {
    const element = this.element.value
    const size = this.size.value
    if (element) {
      if (this.type.value === 'x' &&
                size > element.offsetHeight) {
        return element.offsetHeight / size
      } else if (this.type.value === 'y' &&
                size > element.offsetWidth) {
        return element.offsetWidth / size
      }
    }
    return 1
  })

  /**
     * Calculation of the value for the background-size property
     *
     * Вычисление значения для свойства background-size
     */
  backgroundSize = (0, vue_1.computed)(() => {
    const factorMax = ImageCalculationList_1.ImageCalculationList.get(this.groupName.value).getFactorMax()
    switch (this.type.value) {
      case 'x':
        return `${100 * this.percentWidth.value * factorMax}% auto`
      case 'y':
        return `auto ${100 * this.percentHeight.value * factorMax}%`
    }
    return null
  })

  /**
     * Checks if the current element is available for size adaptation
     *
     * Проверяет, доступен ли текущий элемент для адаптации размера
     */
  isAdaptive () {
    return !!(this.element.value &&
            this.element.value.closest('body') &&
            this.adaptive.value && (this.width.value ||
            this.height.value))
  }

  /**
     * Checks for compliance with the group
     *
     * Проверяет на соответствие группе
     * @param name name of the checked group / название проверяемой группы
     */
  isGroup (name) {
    return this.groupName.value === name
  }

  /**
     * Is it available for calculation
     *
     * Доступен ли для вычисления
     */
  isBeyond () {
    return this.beyond
  }

  /**
     * Is the element visible
     *
     * Виден ли элемент
     */
  isVisible () {
    return this.visible
  }

  /**
     * Returns the identifier of the element
     *
     * Возвращает идентификатор элемента
     */
  getId () {
    return (0, element_1.getIdElement)(this.element.value)
  }

  /**
     * Returns the current element
     *
     * Возвращает текущий элемент
     */
  getElement () {
    return this.element.value
  }

  /**
     * Returns the name of the group
     *
     * Возвращает название группы
     */
  getGroup () {
    return this.groupName.value
  }

  /**
     * Returns the physical width of the object
     *
     * Возвращает физическую ширину объекта
     */
  getWidth () {
    return this.width.value || 0
  }

  /**
     * Returns the physical height of the object
     *
     * Возвращает физическую высоту объекта
     */
  getHeight () {
    return this.height.value || 0
  }

  /**
     * Size change for calculation
     *
     * Изменение размера для вычисления
     * @param width width value / значение ширины
     * @param height height value / значение высоты
     */
  setPercent (width, height) {
    this.percentWidth.value = width
    this.percentHeight.value = height
    return this
  }

  /**
     * Updating data on tracking status
     *
     * Обновление данных по статусу отслеживания
     */
  update () {
    this.beyond = false
    this.visible = false
    if (this.isAdaptive()) {
      if (this.adaptiveAlways.value) {
        this.beyond = true
        this.visible = true
      } else {
        const rect = this.element.value?.getBoundingClientRect()
        if (rect) {
          this.beyond = !(rect.bottom < (0 - exports.MAX_BEYOND) ||
                        rect.top > (window.innerHeight + exports.MAX_BEYOND))
          this.visible = !(rect.bottom < 0 ||
                        rect.top > window.innerHeight)
        }
      }
    }
    return this
  }
}
exports.ImageAdaptiveItem = ImageAdaptiveItem
// # sourceMappingURL=ImageAdaptiveItem.js.map
