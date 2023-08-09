'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.DesignStyles = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
const ref_1 = require('../functions/ref')
/**
 * A class for working with user-defined values in a component
 *
 * Класс для работы с пользовательскими значениями в компоненте
 */
class DesignStyles {
  name
  props
  properties
  extra
  /**
     * Constructor
     * @param name class name / название класса
     * @param props properties / свойства
     * @param properties list of available properties / список доступных свойств
     * @param extra additional styles / дополнительные стили
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (name, props, properties, extra) {
    this.name = name
    this.props = props
    this.properties = properties
    this.extra = extra
  }

  /**
     * List of all user-defined properties
     *
     * Список всех пользовательских свойств
     */
  styles = (0, vue_1.computed)(() => {
    const data = {
      ...this.main.value,
      ...this.additional.value
    }
    return (0, data_1.isFilled)(data) ? data : undefined
  })

  /**
     * List of main styles available through tokens
     *
     * Список основных стилей, доступных через токены
     * @private
     */
  main = (0, vue_1.computed)(() => {
    const data = {}
    this.properties.get()
      .forEach(item => {
        const prop = this.props?.[item.name]
        if (this.properties.isStyle(item, prop)) {
          data[this.getCustomName(item.index)] = prop
        }
      })
    return data
  })

  /**
     * List of additional properties passed through the extra values
     *
     * Список дополнительных свойств, передаваемых через значения extra
     * @private
     */
  additional = (0, vue_1.computed)(() => {
    const data = {}
    if (this.extra) {
      (0, data_1.forEach)((0, ref_1.getRef)(this.extra), (extra, name) => {
        const value = (0, ref_1.getRef)(extra)
        if (value) {
          data[this.getCustomName(name)] = value.toString()
        }
      })
    }
    return data
  })

  /**
     * Returns a list of all user-defined properties
     *
     * Возвращает список всех пользовательских свойств
     */
  get () {
    return this.styles.value
  }

  /**
     * Returns the name of the user-defined property
     *
     * Возвращает имя пользовательского свойства
     * @param name property name / название свойства
     * @private
     */
  getCustomName (name) {
    if (name.match(/^\?\?/)) {
      return name.replace(/^\?\?/, `--${this.name}-sys-`)
    } else {
      return name
    }
  }
}
exports.DesignStyles = DesignStyles
// # sourceMappingURL=DesignStyles.js.map
