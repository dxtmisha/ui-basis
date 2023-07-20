'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ImageAdaptiveGroup = void 0
const vue_1 = require('vue')
const EventScroll_1 = require('../../classes/EventScroll')
const ImageAdaptiveItem_1 = require('./ImageAdaptiveItem')
const ImageCalculationList_1 = require('./ImageCalculationList')
/**
 * Class for working with image scaling
 *
 * Класс для работы с масштабированием изображения
 */
class ImageAdaptiveGroup {
  static objects = []
  static objectsAdaptive = []
  static cache = []
  static event
  static time
  /**
     * Adding a new element for tracking
     *
     * Добавление нового элемента для отслеживания
     * @param element image element for scaling / элемент изображения для масштабирования
     * @param info basic information about the picture / базовая информация о картине
     * @param groupName group name / название группы
     * @param adaptive activity status / статус активности
     * @param adaptiveAlways does the element always participate / участвует ли элемент всегда
     * @param width physical width of the object / физическая ширина объекта
     * @param height physical height of the object / физическая высота объекта
     */
  static add (element, info, groupName, adaptive, adaptiveAlways, width, height) {
    const object = new ImageAdaptiveItem_1.ImageAdaptiveItem(element, info, groupName, adaptive, adaptiveAlways, width, height)
    this.objects.push(object);
    (0, vue_1.watch)([
      element,
      info,
      groupName,
      adaptive,
      width,
      height
    ], () => this.init(), { immediate: true })
    return object
  }

  /**
     * Removal of the element
     *
     * Удаления элемента
     * @param element image element for scaling / элемент изображения для масштабирования
     */
  static remove (element) {
    const key = this.objects.findIndex(item => item.getElement() === element.value)
    if (key !== -1) {
      this.objects.splice(key, 1)
    }
    this.init()
  }

  /**
     * Starting or stopping tracking the image size
     *
     * Запуск или отключение слежения за размером изображения
     */
  static init () {
    if (this.event &&
            this.objects.length < 1) {
      this.event.stop()
      this.event = undefined
    } else if (this.objects.length > 0) {
      this.event = new EventScroll_1.EventScroll(window, () => this.start())
        .go()
    }
  }

  /**
     * Method for checking the conditions for starting the update of parameters
     *
     * Метод проверки условий запуска обновления параметров
     * @protected
     */
  static start () {
    if (this.isAdaptive()) {
      this.updateAdaptive()
      const visible = this.updateVisible()
      if (this.isCache(visible)) {
        this.cache = visible
        this.updateSize()
        this.updatePercent()
        this.updateFactorMax()
      }
    } else {
      this.event?.stop()
    }
  }

  /**
     * Updates the list of active records
     *
     * Обновляет список активных записей
     * @protected
     */
  static updateAdaptive () {
    this.objectsAdaptive = []
    this.objects.forEach(item => {
      item.update()
      if (item.isBeyond()) {
        this.objectsAdaptive.push(item)
      }
    })
  }

  /**
     * Updates the list of visible values and returns this list
     *
     * Обновляет список видимых значений и возвращает этот список
     * @protected
     */
  static updateVisible () {
    const visible = []
    this.objectsAdaptive.forEach(item => {
      if (item.isVisible()) {
        visible.push(item.getId())
      }
    })
    return visible
  }

  /**
     * Updates the physical and virtual sizes
     *
     * Обновляет физические и виртуальные размеры
     * @protected
     */
  static updateSize () {
    ImageCalculationList_1.ImageCalculationList.reset()
    this.objectsAdaptive.forEach(item => {
      const element = item.getElement()
      if (element &&
                item.isVisible()) {
        ImageCalculationList_1.ImageCalculationList.get(item.getGroup())
          .setWidth(item.getWidth())
          .setHeight(item.getHeight())
          .setOffsetWidth(element.offsetWidth)
          .setOffsetHeight(element.offsetHeight)
      }
    })
  }

  /**
     * Change of the output size
     *
     * Изменение выводимого размера
     * @protected
     */
  static updatePercent () {
    if (ImageCalculationList_1.ImageCalculationList.isSize()) {
      this.objectsAdaptive.forEach(item => {
        const element = item.getElement()
        const calculation = ImageCalculationList_1.ImageCalculationList.get(item.getGroup())
        if (element) {
          const width = calculation.getWidth()
          const height = calculation.getHeight()
          item.setPercent(item.getWidth() * (width ? 1 / width : 0) * (calculation.getOffsetWidth() / element.offsetWidth), item.getHeight() * (height ? 1 / height : 0) * (calculation.getOffsetHeight() / element.offsetHeight))
        }
      })
    }
  }

  /**
     * Changes of the scaling value
     *
     * Изменения масштабирования значения
     * @protected
     */
  static updateFactorMax () {
    if (ImageCalculationList_1.ImageCalculationList.isSize()) {
      this.objectsAdaptive.forEach(item => {
        if (item.isVisible()) {
          ImageCalculationList_1.ImageCalculationList.get(item.getGroup())
            .setFactorMax(item.factor.value)
        }
      })
    }
  }

  /**
     * Checks if the composition of visible values has changed
     *
     * Проверяет, изменился ли состав видимых значений
     * @param visible list of indexes of visible values / список индексов видимых значений
     * @private
     */
  static isCache (visible) {
    return this.cache.join('|') !== visible.join('|')
  }

  /**
     * Checks if there is an active element at the moment
     *
     * Проверяет, есть ли в текущий момент активный элемент
     * @private
     */
  static isAdaptive () {
    return !!this.objects.find(item => item.isAdaptive())
  }
}
exports.ImageAdaptiveGroup = ImageAdaptiveGroup
// # sourceMappingURL=ImageAdaptiveGroup.js.map
