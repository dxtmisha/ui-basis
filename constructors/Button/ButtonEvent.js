'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ButtonEvent = exports.propsButtonEvent = void 0
const vue_1 = require('vue')
const vue_router_1 = require('vue-router')
const EventItem_1 = require('../../classes/EventItem')
exports.propsButtonEvent = {
  to: String,
  value: [String, Number, Object],
  detail: [Object]
}
/**
 * Base class for working with button events
 *
 * Базовый класс для работы с событиями кнопки
 */
class ButtonEvent {
  emits
  props
  enabled
  /**
     * Parameters for the event
     *
     * Параметры для события
     * @protected
     */
  options = (0, vue_1.computed)(() => {
    return {
      type: 'click',
      value: this.props?.value,
      detail: this.props?.detail
    }
  })

  /**
     * Constructor
     * @param emits function for calling an event / функция для вызова события
     * @param props input property / входное свойство
     * @param enabled object of the activity management class / объект класса управления активности
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (emits, props, enabled) {
    this.emits = emits
    this.props = props
    this.enabled = enabled
  }

  /**
     * Events when clicking on the button itself
     *
     * События при клике на самой кнопке
     * @param event press events / события нажатия
     */
  onClick (event) {
    if (this.enabled.is() && !this.router()) {
      this.emits('click', event, this.options.value)
    } else {
      EventItem_1.EventItem.stopPropagation(event)
    }
  }

  /**
     * Events when clicking on the icon on the right
     *
     * События при нажатии на иконку справа
     * @param event press events / события нажатия
     */
  onTrailing (event) {
    if (this.enabled.is()) {
      this.emits('click', event, {
        ...this.options.value,
        type: 'trailing'
      })
    } else {
      EventItem_1.EventItem.stopPropagation(event)
    }
  }

  /**
     * Changing the link through the router
     *
     * Изменение ссылки через router
     * @protected
     */
  router () {
    if (this.props?.to) {
      (0, vue_router_1.useRouter)().push(this.props?.to).then()
      return true
    }
    return false
  }
}
exports.ButtonEvent = ButtonEvent
// # sourceMappingURL=ButtonEvent.js.map
