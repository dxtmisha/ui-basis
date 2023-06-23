'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.DesignClasses = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
const ref_1 = require('../functions/ref')
/**
 * Class for working with classes in a component
 *
 * Класс для работы с классами в компоненте
 */
class DesignClasses {
  name
  properties
  props
  extra = (0, vue_1.ref)({})
  // eslint-disable-next-line no-useless-constructor
  constructor (name, properties, props) {
    this.name = name
    this.properties = properties
    this.props = props
  }

  get () {
    return this.classes
  }

  getName () {
    return this.name.value || 'design-component'
  }

  setExtra (data) {
    this.extra.value = data
    return this
  }

  setExtraMain (data) {
    this.extra.value.main = data
    return this
  }

  classes = (0, vue_1.computed)(() => {
    return {
      main: {
        ...this.classesMain.value,
        ...this.classesProperties.value
      }
    }
  })

  /**
     * An object containing all the classes for working with basic data types.
     *
     * Объект, содержащий все классы для работы с базовыми типами данных.
     * @protected
     */
  classesMain = (0, vue_1.computed)(() => {
    return {
      [this.getName()]: true,
      ...this.getExtraByName('main')
    }
  })

  /**
     * List of active state classes
     *
     * Список активных классов состояний
     * @protected
     */
  classesProperties = (0, vue_1.computed)(() => {
    const name = this.getName()
    const data = {}
    this.properties.get()?.forEach(item => {
      const prop = this.props?.[item.name]
      const is = this.properties.isValue(item.name, prop)
      const className = `${name}--${item.index}`
      if (is || this.properties.isStyle(item.name, prop)) {
        if (prop === true || this.properties.isBool(item.name)) {
          data[`${className}`] = true
        }
        if (is && typeof prop === 'string') {
          data[`${className}--${prop}`] = true
        }
      }
    })
    return data
  })

  /**
     * Returns additional parameters by their name
     *
     * Возвращает дополнительные параметры по их имени
     * @param name element name / имя элемента
     * @protected
     */
  getExtraByName (name) {
    const extra = {};
    (0, data_1.forEach)(this.extra.value?.[name], (item, index) => {
      extra[index] = (0, ref_1.getRef)((0, data_1.executeFunction)(item))
    })
    return extra
  }
}
exports.DesignClasses = DesignClasses
// # sourceMappingURL=DesignClasses.js.map
