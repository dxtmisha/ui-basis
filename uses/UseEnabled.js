'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.UseEnabled = void 0
const vue_1 = require('vue')
/**
 * Class for managing the activity of an element
 *
 * Класс для управления активности элемента
 */
class UseEnabled {
  props
  /**
     * Constructor
     * @param props input property / входное свойство
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (props) {
    this.props = props
  }

  item = (0, vue_1.computed)(() => !this.props?.disabled &&
        !this.props?.readonly &&
        !this.props?.progress)

  disabled = (0, vue_1.computed)(() => this.isDisabled() || undefined)
  /**
     * Checking for the status of the element’s activity
     *
     * Проверка на статус активности элемента
     */
  is () {
    return this.item.value
  }

  /**
     * Checks if the element is turned off
     *
     * Проверяет, выключен ли элемент
     */
  isDisabled () {
    return !!this.props?.disabled
  }

  /**
     * Checks for read-only status
     *
     * Проверяет на статус только для чтения
     */
  isReadonly () {
    return !!this.props?.readonly
  }

  /**
     * Checks for the presence of an element for loading
     *
     * Проверяет наличие элемента для загрузки
     */
  isProgress () {
    return !!this.props?.progress
  }
}
exports.UseEnabled = UseEnabled
// # sourceMappingURL=UseEnabled.js.map
