'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ImagePosition = void 0
const vue_1 = require('vue')
/**
 * Class for working with position
 *
 * Класс для работы с позицией
 */
class ImagePosition {
  coordinator
  x
  y
  /**
     * Constructor
     * @param coordinator coordinates for margins / координаты для отступов
     * @param x coordinate of the picture on the left / координата картины слева
     * @param y coordinate of the picture on the top / координата картины сверху
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (coordinator, x, y) {
    this.coordinator = coordinator
    this.x = x
    this.y = y
  }

  /**
     * The position of the picture is on the left
     *
     * Положение картины слева
     * @protected
     */
  positionX = (0, vue_1.computed)(() => {
    if (this.coordinator.is()) {
      return `${this.coordinator.getCoordinator()[3] + (this.coordinator.get().width / 2)}%`
    } else {
      return this.x.value?.toString() || null
    }
  })

  /**
     * The position of the picture is on the top
     *
     * Положение картины сверху
     * @protected
     */
  positionY = (0, vue_1.computed)(() => {
    if (this.coordinator.is()) {
      return `${this.coordinator.getCoordinator()[0] + (this.coordinator.get().height / 2)}%`
    } else {
      return this.y.value?.toString() || null
    }
  })

  /**
     * Returns the position on the left
     *
     * Возвращает позицию слева
     */
  getX () {
    return this.positionX.value
  }

  /**
     * Returns the position on the top
     *
     * Возвращает позицию сверху
     */
  getY () {
    return this.positionY.value
  }
}
exports.ImagePosition = ImagePosition
// # sourceMappingURL=ImagePosition.js.map
