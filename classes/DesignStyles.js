'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.DesignStyles = void 0
const vue_1 = require('vue')
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
     * List of all user-defined properties
     *
     * Список всех пользовательских свойств
     * @protected
     */
  styles = (0, vue_1.computed)(() => {
    const data = {}
    this.properties.get()?.forEach(item => {
      const prop = this.props?.[item.name]
      if (this.properties.isStyle(item, prop)) {
        data[this.getCustomName(item.index)] = prop
      }
    })
    return data
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
