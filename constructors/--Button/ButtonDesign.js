'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ButtonDesign = void 0
const vue_1 = require('vue')
const Design_1 = require('../../classes/Design')
const UseEnabled_1 = require('../../uses/UseEnabled')
const ButtonEvent_1 = require('./ButtonEvent')
const ButtonLabel_1 = require('./ButtonLabel')
// [!] System label, cannot be deleted
// [!] Системная метка, нельзя удалять
// :components-import
const ButtonIcon_1 = require('./ButtonIcon')
const ButtonProgress_1 = require('./ButtonProgress')
// :components-import
/**
 * ButtonDesign
 */
class ButtonDesign extends Design_1.Design {
  props
  enabled
  event
  label
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :components-variable
  icon
  progress
  // :components-variable
  /**
     * Constructor
     * @param props properties / свойства
     * @param contextEmit additional property / дополнительное свойство
     */
  constructor (props, contextEmit) {
    super(props, contextEmit)
    this.props = props
    this.enabled = new UseEnabled_1.UseEnabled(this.props)
    this.event = new ButtonEvent_1.ButtonEvent(this.emit, this.props, this.enabled)
    this.label = new ButtonLabel_1.ButtonLabel(this.components, this.slots, this.props)
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :components-init
    this.icon = new ButtonIcon_1.ButtonIcon(this.classes, this.components, this.props, this.refs)
    this.progress = new ButtonProgress_1.ButtonProgress(this.classes, this.components, this.props, this.refs)
    // :components-init
  }

  /**
     * Method for generating additional properties
     *
     * Метод для генерации дополнительных свойств
     * @protected
     */
  init () {
    const setup = {
      isEnabled: this.enabled.item,
      disabledBind: this.enabled.disabled,
      onClick: (event) => this.event.onClick(event)
    }
    if (this.progress.bind) {
      this.classes.setExtraState({
        progress: this.progress.is
      })
    }
    if ('label' in this.props) {
      setup.isLabel = this.label.is
    }
    if (this.icon.iconBind) {
      setup.iconBind = this.icon.iconBind
    }
    if (this.icon.trailingBind) {
      setup.trailingBind = this.icon.trailingBind
      setup.onTrailing = (event) => this.event.onTrailing(event)
    }
    return setup
  }

  /**
     * A method for rendering
     *
     * Метод для рендеринга
     * @protected
     */
  initRender () {
    const setup = this.getSetup()
    const children = [
      ...this.progress.render(),
      ...this.label.render(setup.classes.value.label),
      ...this.icon.render()
    ]
    if (setup.isEnabled.value) {
      this.components.render(children, 'ripple')
    }
    return (0, vue_1.h)(this.refs.tag.value, {
      ref: this.element,
      class: setup.classes.value.main,
      style: setup.styles.value,
      disabled: setup.disabledBind.value,
      onClick: setup.onClick
    }, children)
  }
}
exports.ButtonDesign = ButtonDesign
// # sourceMappingURL=ButtonDesign.js.map
