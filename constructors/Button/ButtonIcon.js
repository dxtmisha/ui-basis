'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ButtonIcon = exports.propsButtonIcon = void 0
const vue_1 = require('vue')
const render_1 = require('../../functions/render')
exports.propsButtonIcon = {
  // Values
  icon: [String, Object],
  iconTrailing: [String, Object],
  // Icon
  iconTurn: Boolean,
  iconHide: Boolean,
  // Status
  selected: Boolean
}
/**
 * ButtonIcon
 */
class ButtonIcon {
  props
  components
  event
  classes
  iconBind
  trailingBind
  /**
     * Constructor
     * @param props input parameter / входной параметр
     * @param components object for working with components / объект для работы с компонентами
     * @param event an object for working with events / объект для работы с событиями
     * @param classes class name for the component / название класса для компонента
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (props, components, event, classes) {
    this.props = props
    this.components = components
    this.event = event
    this.classes = classes
    const refs = (0, vue_1.toRefs)(this.props)
    if ('icon' in this.props) {
      this.iconBind = (0, render_1.getBind)(refs?.icon, (0, vue_1.computed)(() => ({
        active: this.props?.selected,
        hide: this.props?.iconHide,
        animationType: 'type2',
        start: true
      })), 'icon')
    }
    if ('iconTrailing' in this.props) {
      this.trailingBind = (0, render_1.getBind)(refs?.iconTrailing, (0, vue_1.computed)(() => ({
        turn: this.props?.iconTurn,
        end: true,
        high: true,
        onTrailing: (event) => this.event?.onTrailing(event)
      })), 'icon')
    }
  }

  is = (0, vue_1.computed)(() => !!(this.props?.icon || this.props?.iconTrailing))
  /**
     * A method for rendering
     *
     * Метод для рендеринга
     * @protected
     */
  render () {
    const elements = []
    if (this.components) {
      if (this.iconBind && this.props?.icon) {
        this.components.renderAdd(elements, 'icon', {
          class: this.classes?.icon || 'icon',
          ...this.iconBind.value
        })
      }
      if (this.trailingBind && this.props?.iconTrailing) {
        this.components.renderAdd(elements, 'icon', {
          class: this.classes?.trailing || 'trailing',
          ...this.trailingBind.value
        })
      }
    }
    return elements
  }
}
exports.ButtonIcon = ButtonIcon
// # sourceMappingURL=ButtonIcon.js.map
