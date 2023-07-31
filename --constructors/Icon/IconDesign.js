'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.IconDesign = void 0
const vue_1 = require('vue')
const Design_1 = require('../../classes/Design')
/**
 * IconDesign
 */
class IconDesign extends Design_1.Design {
  props
  /**
     * Constructor
     * @param props properties / свойства
     * @param contextEmit additional property / дополнительное свойство
     */
  constructor (props, contextEmit) {
    super(props, contextEmit)
    this.props = props
  }

  /**
     * Method for generating additional properties
     *
     * Метод для генерации дополнительных свойств
     * @protected
     */
  init () {
    return {
      isActive: this.isActive,
      iconBind: this.getBind(this.refs.icon, this.iconBind),
      iconActiveBind: this.getBind(this.refs.iconActive, this.iconActiveBind)
    }
  }

  /**
     * A method for rendering
     *
     * Метод для рендеринга
     * @protected
     */
  initRender () {
    const setup = this.getSetup()
    const children = []
    this.initSlot('default', children)
    if (this.props.icon) {
      this.components.render(children, 'image', setup.iconBind.value)
    }
    if (this.props.iconActive) {
      this.components.render(children, 'image', setup.iconActiveBind.value)
    }
    return (0, vue_1.h)('span', {
      ref: this.element,
      class: setup.classes.value.main
    }, children)
  }

  /**
     * Basic input data for the first image
     *
     * Базовые входные данные для первого изображения
     * @protected
     */
  iconBind = (0, vue_1.computed)(() => {
    return {
      class: this.classes.getNameBySubclass(['icon']),
      ...this.imageBind.value,
      hide: this.isActive.value
    }
  })

  /**
     * Basic input data for the active icon
     *
     * Базовые входные данные для активной иконки
     * @protected
     */
  iconActiveBind = (0, vue_1.computed)(() => {
    return {
      class: this.classes.getNameBySubclass(['active']),
      ...this.imageBind.value,
      hide: !this.isActive.value
    }
  })

  /**
     * Basic input parameters for the image
     *
     * Базовые входные параметры для изображения
     * @protected
     */
  imageBind = (0, vue_1.computed)(() => {
    return {
      disabled: this.props.disabled,
      turn: this.props.turn,
      onLoad: (value) => this.context.emit('load', value)
    }
  })

  /**
     * Switch the element to activity mode
     *
     * Переводить элемент в режим активности
     * @protected
     */
  isActive = (0, vue_1.computed)(() => !!(this.props.iconActive && this.props.active))
}
exports.IconDesign = IconDesign
// # sourceMappingURL=IconDesign.js.map
