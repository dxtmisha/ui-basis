'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Design = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
const DesignProperties_1 = require('./DesignProperties')
const DesignClasses_1 = require('./DesignClasses')
/**
 * Main class for binding tokens and Vue components
 *
 * Основной класс для связывания токенов и компонентов Vue
 */
class Design {
  props
  context
  name = (0, vue_1.ref)('design-component')
  properties
  classes
  /**
     * Constructor
     * @param props свойства
     * @param context additional property / дополнительное свойство
     */
  constructor (props, context) {
    this.props = props
    this.context = context
    this.properties = new DesignProperties_1.DesignProperties()
    this.classes = new DesignClasses_1.DesignClasses(this.name, this.properties, this.props)
  }

  /**
     * Returns props
     *
     * Возвращает свойства (props)
     */
  getProps () {
    return this.props
  }

  getName () {
    return this.name.value
  }

  /**
     * Component names.
     * Are added automatically during build
     *
     * Названия компонентов.
     * Добавляются автоматически во время сборки
     * @param name
     */
  setName (name) {
    this.name.value = name
    return this
  }

  /**
     * Add all component properties.
     * Are added automatically during build
     *
     * Добавление всех свойств компонента.
     * Добавляются автоматически во время сборки
     * @param properties
     */
  setProperties (properties) {
    this.properties.set(properties)
    return this
  }

  setup (dataCallback) {
    return {
      classes: this.classes.get(),
      ...((0, data_1.executeFunction)(dataCallback) || {})
    }
  }
}
exports.Design = Design
// # sourceMappingURL=Design.js.map
