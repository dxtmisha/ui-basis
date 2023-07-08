'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.IconDesign = void 0
const vue_1 = require('vue')
const Design_1 = require('../../classes/Design')
/**
 * IconDesign
 */
class IconDesign extends Design_1.Design {
  /**
     * Method for generating additional properties
     *
     * Метод для генерации дополнительных свойств
     * @protected
     */
  init () {
    return {
      isActive: this.isActive,
      iconBind: this.getBind(this.refs.icon, this.imageBind),
      iconActiveBind: this.getBind(this.refs.iconActive, this.imageBind)
    }
  }

  /**
     * A method for rendering
     *
     * Метод для рендеринга
     * @param setup the result of executing the setup method / результат выполнения метода настройки
     * @protected
     */
  initRender (setup) {
    const children = []
    this.initSlot('default', children)
    if (this.components?.image) {
      if (this.props.icon) {
        children.push((0, vue_1.h)(this.components?.image, setup.iconBind.value))
      }
      if (this.props.iconActive) {
        children.push((0, vue_1.h)(this.components?.image, setup.iconActiveBind.value))
      }
    }
    return (0, vue_1.h)('div', {
      ref: this.element,
      class: setup.classes.value.main
    }, children)
  }

  /**
     * Switch the element to activity mode
     *
     * Переводить элемент в режим активности
     * @protected
     */
  isActive = (0, vue_1.computed)(() => !!(this.props.iconActive && this.props.active))
  /**
     * Basic input parameters for the image
     *
     * Базовые входные параметры для изображения
     * @protected
     */
  imageBind = (0, vue_1.computed)(() => {
    return {
      disabled: this.props.disabled,
      turn: this.props.turn
    }
  })
}
exports.IconDesign = IconDesign
// # sourceMappingURL=IconDesign.js.map
