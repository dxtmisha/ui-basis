'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ButtonInscription = void 0
const vue_1 = require('vue')
/**
 * Class for working with text on the button
 *
 * Класс для работы с текстом на кнопке
 */
class ButtonInscription {
  components
  slots
  props
  /**
     * Constructor
     * @param components object for working with components / объект для работы с компонентами
     * @param slots object for working with slots / объект для работы со слотами
     * @param props input property / входное свойство
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (components, slots, props) {
    this.components = components
    this.slots = slots
    this.props = props
  }

  /**
     * Checking if the text is available
     *
     * Проверка, доступен ли текст
     */
  isInscription = (0, vue_1.computed)(() => !!this.props.label || 'default' in this.slots)
  /**
     * A method for rendering
     *
     * Метод для рендеринга
     * @param className class name / название класса
     * @protected
     */
  render (className) {
    const elements = []
    if (this.isInscription.value) {
      const children = []
      if (this.props.label) {
        children.push(this.props.label)
      }
      if (this.slots?.default) {
        children.push(this.slots.default?.())
      }
      elements.push(this.components.getNode('span', { class: className }, children, 'inscription'))
    }
    return elements
  }
}
exports.ButtonInscription = ButtonInscription
// # sourceMappingURL=ButtonInscription.js.map
