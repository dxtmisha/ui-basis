'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ImageCoordinator = void 0
const vue_1 = require('vue')
/**
 * Class for working with coordinates
 *
 * Класс для работы с координатами
 */
class ImageCoordinator {
  coordinator
  /**
     * Constructor
     * @param coordinator coordinates for margins / координаты для отступов
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (coordinator) {
    this.coordinator = coordinator
  }

  /**
     * Size for the picture
     *
     * Размер для картины
     * @protected
     */
  item = (0, vue_1.computed)(() => {
    const coordinator = this.getCoordinator()
    return {
      width: 100 - coordinator[1] - coordinator[3],
      height: 100 - coordinator[2] - coordinator[0]
    }
  })

  /**
     * Checking for availability of coordinates
     *
     * Проверка на доступность координат
     */
  is () {
    return Array.isArray(this.coordinator.value) &&
            this.coordinator.value.length > 0 &&
            this.coordinator.value.length < 5
  }

  /**
     * Returns sizes by the input parameter of coordinates
     *
     * Возвращает размеры по входному параметру координаты
     */
  get () {
    return this.item.value
  }

  /**
     * Returns sizes by the input parameter of coordinates
     *
     * Возвращает размеры по входному параметру координаты
     */
  getItem () {
    return this.item
  }

  /**
     * Returns coordinates
     *
     * Возвращает координаты
     */
  getCoordinator () {
    if (this.coordinator.value) {
      switch (this.coordinator.value.length) {
        case 1:
          return [
            this.coordinator.value[0],
            this.coordinator.value[0],
            this.coordinator.value[0],
            this.coordinator.value[0]
          ]
        case 2:
          return [
            this.coordinator.value[0],
            this.coordinator.value[1],
            this.coordinator.value[0],
            this.coordinator.value[1]
          ]
        case 3:
          return [
            this.coordinator.value[0],
            this.coordinator.value[1],
            this.coordinator.value[2],
            this.coordinator.value[1]
          ]
        case 4:
          return this.coordinator.value
      }
    }
    return [0, 0, 0, 0]
  }

  /**
     * Getting the adapted size for the property
     *
     * Получение адаптированного размера для свойства
     */
  getSize () {
    return {
      width: `${100 / this.get().width * 100}%`,
      height: `${100 / this.get().height * 100}%`
    }
  }
}
exports.ImageCoordinator = ImageCoordinator
// # sourceMappingURL=ImageCoordinator.js.map
