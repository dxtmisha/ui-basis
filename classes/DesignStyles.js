'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.DesignStyles = void 0
const vue_1 = require('vue')
const ref_1 = require('../functions/ref')
const data_1 = require('../functions/data')
/**
 * A class for working with user-defined values in a component
 *
 * Класс для работы с пользовательскими значениями в компоненте
 */
class DesignStyles {
  name
  properties
  props
  /**
     * List of additional styles
     *
     * Список дополнительных стилей
     * @protected
     */
  extra = (0, vue_1.ref)()
  /**
     * Constructor
     * @param name class name / название класса
     * @param properties list of available properties / список доступных свойств
     * @param props properties / свойства
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (name, properties, props) {
    this.name = name
    this.properties = properties
    this.props = props
  }

  /**
     * Returns a list of all user-defined properties
     *
     * Возвращает список всех пользовательских свойств
     */
  get () {
    return this.styles.value
  }

  /**
     * Returns a list of all user-defined properties
     *
     * Возвращает список всех пользовательских свойств
     */
  getItem () {
    return this.styles
  }

  /**
     * Returns the base class name
     *
     * Возвращает базовое название класса
     */
  getName () {
    return this.name.value || 'design-component'
  }

  /**
     * Adding additional styles
     *
     * Добавление дополнительных стилей
     * @param data list of additional classes / список дополнительных классов
     */
  setExtra (data) {
    this.extra.value = data
    return this
  }

  /**
     * List of all user-defined properties
     *
     * Список всех пользовательских свойств
     * @protected
     */
  styles = (0, vue_1.computed)(() => {
    const data = {
      ...(0, ref_1.getRef)(this.extra.value || {})
    }
    this.properties.get()?.forEach(item => {
      const prop = this.props?.[item.name]
      if (this.properties.isStyle(item, prop)) {
        data[this.getCustomName(item.index)] = prop
      }
    })
    return (0, data_1.isFilled)(data) ? data : undefined
  })

  /**
     * Returns the name of the user-defined property
     *
     * Возвращает имя пользовательского свойства
     * @param name property name / название свойства
     * @private
     */
  getCustomName (name) {
    return `--${this.getName()}-sys-${name}`
  }
}
exports.DesignStyles = DesignStyles
// # sourceMappingURL=DesignStyles.js.map
