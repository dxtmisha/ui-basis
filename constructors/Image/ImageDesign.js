'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ImageDesign = void 0
const vue_1 = require('vue')
const Design_1 = require('../../classes/Design')
const Image_1 = require('./Image')
/**
 * ImageDesign
 */
class ImageDesign extends Design_1.Design {
  props
  image
  /**
     * Constructor
     * @param props properties / свойства
     * @param contextEmit additional property / дополнительное свойство
     */
  constructor (props, contextEmit) {
    super(props, contextEmit)
    this.props = props
    this.image = new Image_1.Image(this.element, this.classes.getName(), this.refs.value, this.refs.coordinator, this.refs.size, this.refs.x, this.refs.y, this.refs.adaptiveGroup, this.refs.adaptive, this.refs.adaptiveAlways, this.refs.objectWidth, this.refs.objectHeight, this.refs.url)
    this.setExtraMain(this.image.classes)
    this.setExtraStyles(this.image.styles);
    (0, vue_1.onUnmounted)(() => this.image.destructor());
    (0, vue_1.watch)(this.image.getDataImage(), value => this.context.emit('load', value))
  }

  /**
     * Method for generating additional properties
     *
     * Метод для генерации дополнительных свойств
     * @protected
     */
  init () {
    return {
      text: this.image.text
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
    return (0, vue_1.h)('span', {
      ref: this.element,
      class: setup.classes.value.main,
      style: setup.styles.value,
      translate: 'no'
    }, setup.text.value)
  }
}
exports.ImageDesign = ImageDesign
// # sourceMappingURL=ImageDesign.js.map
