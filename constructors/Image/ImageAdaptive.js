'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ImageAdaptive = void 0
const vue_1 = require('vue')
const ImageAdaptiveGroup_1 = require('./ImageAdaptiveGroup')
/**
 * Class for managing the scaling of the element. Class for the entry point
 *
 * Класс для управления масштабированием элемента. Класс для точки входа
 */
class ImageAdaptive {
  element
  data
  groupName
  adaptive
  adaptiveAlways
  width
  height
  item
  /**
     * Constructor
     * @param element image element for scaling / элемент изображения для масштабирования
     * @param data data management object / объект управления данными
     * @param groupName group name / название группы
     * @param adaptive activity status / статус активности
     * @param adaptiveAlways does the element always participate / участвует ли элемент всегда
     * @param width physical width of the object / физическая ширина объекта
     * @param height physical height of the object / физическая высота объекта
     */
  constructor (element, data, groupName, adaptive, adaptiveAlways, width, height) {
    this.element = element
    this.data = data
    this.groupName = groupName
    this.adaptive = adaptive
    this.adaptiveAlways = adaptiveAlways
    this.width = width
    this.height = height;
    (0, vue_1.watchEffect)(() => this.update())
  }

  /**
     * Checks if the element’s conditions are suitable for scaling
     *
     * Проверяет, подходить ли у элемента условия для масштабирования
     */
  is () {
    return this.adaptive.value && this.data.isImage()
  }

  /**
     * Returns the size for the background-size property
     *
     * Возвращает размер для свойства background-size
     */
  getSize () {
    return this.item?.backgroundSize.value || null
  }

  /**
     * Removal of the element for scaling
     *
     * Удаления элемента для масштабирования
     */
  remove () {
    ImageAdaptiveGroup_1.ImageAdaptiveGroup.remove(this.element)
  }

  /**
     * Update of the element’s status
     *
     * Обновление статуса элемента
     * @private
     */
  update () {
    this.remove()
    if (this.is()) {
      this.item = ImageAdaptiveGroup_1.ImageAdaptiveGroup.add(this.element, this.data.getItem(), this.groupName, this.adaptive, this.adaptiveAlways, this.width, this.height)
    }
  }
}
exports.ImageAdaptive = ImageAdaptive
// # sourceMappingURL=ImageAdaptive.js.map
