'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ButtonLabel = exports.propsButtonLabel = void 0
const vue_1 = require('vue')
const render_1 = require('../../functions/render')
exports.propsButtonLabel = {
  label: [String, Number]
}
/**
 * Class for working with text on the button
 *
 * Класс для работы с текстом на кнопке
 */
class ButtonLabel {
  props
  slots
  className
  /**
     * Constructor
     * @param props input property / входное свойство
     * @param slots object for working with slots / объект для работы со слотами
     * @param className class name / название класса
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (props, slots, className) {
    this.props = props
    this.slots = slots
    this.className = className
  }

  /**
     * Checking if the text is available
     *
     * Проверка, доступен ли текст
     */
  is = (0, vue_1.computed)(() => !!(this.props?.label || (this.slots &&
        'default' in this.slots)))

  /**
     * A method for rendering
     *
     * Метод для рендеринга
     * @protected
     */
  render () {
    const elements = []
    if ('label' in this.props &&
            this.is.value) {
      const children = []
      if (this.props.label) {
        children.push(this.props.label)
      }
      if (this.slots && this.slots?.default) {
        children.push(this.slots.default?.({}))
      }
      if (children.length > 0) {
        elements.push((0, render_1.render)('span', { class: this.className || 'label' }, children))
      }
    }
    return elements
  }
}
exports.ButtonLabel = ButtonLabel
// # sourceMappingURL=ButtonLabel.js.map
