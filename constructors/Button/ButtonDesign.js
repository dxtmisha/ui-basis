'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ButtonDesign = void 0
const vue_1 = require('vue')
const Design_1 = require('../../classes/Design')
const UseEnabled_1 = require('../../uses/UseEnabled')
const ButtonEvent_1 = require('./ButtonEvent')
const ButtonInscription_1 = require('./ButtonInscription')
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
  inscription
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
    this.inscription = new ButtonInscription_1.ButtonInscription(this.components, this.slots, this.props)
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
    this.classes.setExtraState({
      progress: this.progress.is
    })
    return {
      isEnabled: this.enabled.item,
      isInscription: this.inscription.isInscription,
      disabledBind: this.enabled.disabled,
      iconBind: this.icon.iconBind,
      trailingBind: this.icon.trailingBind,
      onClick: (event) => this.event.onClick(event),
      onTrailing: (event) => this.event.onTrailing(event)
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
    const children = [
      ...this.progress.render(),
      ...this.inscription.render(setup.classes.value.inscription),
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
