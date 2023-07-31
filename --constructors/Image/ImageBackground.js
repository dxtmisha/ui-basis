'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ImageBackground = void 0
const vue_1 = require('vue')
const data_1 = require('../../functions/data')
/**
 * Class for generating a link in the background-image property
 *
 * Класс для генерации ссылки в свойстве background-image
 */
class ImageBackground {
  data
  coordinator
  adaptive
  size
  /**
     * Constructor
     * @param data object for working with values / объект для работы со значениями
     * @param coordinator object for working with coordinates / объект для работы с координатами
     * @param adaptive an object for working with adaptive layout / объект для работы с adaptive
     * @param size property determining the size of the picture / свойство определяющее размер картины
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (data, coordinator, adaptive, size) {
    this.data = data
    this.coordinator = coordinator
    this.adaptive = adaptive
    this.size = size
  }

  /**
     * Values for the background property
     *
     * Значения для свойства background
     * @private
     */
  item = (0, vue_1.computed)(() => {
    const size = this.size.value
    if (this.coordinator.is()) {
      return this.getSizeByCoordinator()
    } else if (this.adaptive.is()) {
      return this.adaptive.getSize()
    } else if (size && (0, data_1.isFilled)(size)) {
      return size.toString().match(/%$/) ? this.getSize(size, size) : size.toString()
    } else {
      return null
    }
  })

  /**
     * Returns values for the background property
     *
     * Возвращает значения для свойства background
     */
  get () {
    return this.item.value
  }

  /**
     * Returns values for the background property
     *
     * Возвращает значения для свойства background
     */
  getItem () {
    return this.item
  }

  /**
     * Returns a string value for the background-image property
     *
     * Возвращает строку значения для свойства background-image
     */
  getImage () {
    const image = this.data.get()
    switch (typeof image) {
      case 'string':
        return `url("${image}")`
      case 'object':
        return `url("${image.src}")`
      default:
        return null
    }
  }

  /**
     * Returns a formatted value for the background-size property
     *
     * Возвращает отформатированное значение для свойства background-size
     * @param width width value / значение ширины
     * @param height height value / значение высоты
     */
  getSize (width, height) {
    const image = this.data.get()
    if (typeof image === 'object') {
      return image.height < image.width ? `auto ${height}` : `${width} auto`
    } else {
      return null
    }
  }

  getSizeByCoordinator () {
    const { width, height } = this.coordinator.getSize()
    return this.getSize(width, height)
  }
}
exports.ImageBackground = ImageBackground
// # sourceMappingURL=ImageBackground.js.map
