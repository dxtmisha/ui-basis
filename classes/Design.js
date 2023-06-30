'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Design = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
const To_1 = require('./To')
const DesignProperties_1 = require('./DesignProperties')
const DesignClasses_1 = require('./DesignClasses')
const DesignStyles_1 = require('./DesignStyles')
/**
 * Main class for binding tokens and Vue components
 *
 * Основной класс для связывания токенов и компонентов Vue
 */
class Design {
  props
  context
  /**
     * Class name
     *
     * Название класса
     * @protected
     */
  name = (0, vue_1.ref)('design-component')
  properties
  classes
  styles
  element = (0, vue_1.ref)()
  refs
  /**
     * Constructor
     * @param props properties / свойства
     * @param context additional property / дополнительное свойство
     */
  constructor (props, context) {
    this.props = props
    this.context = context
    this.refs = (0, vue_1.toRefs)(props)
    this.properties = new DesignProperties_1.DesignProperties()
    this.classes = new DesignClasses_1.DesignClasses(this.name, this.properties, this.props)
    this.styles = new DesignStyles_1.DesignStyles(this.name, this.properties, this.props)
  }

  /**
     * Returns the base class name
     *
     * Возвращает базовое название класса
     */
  getName () {
    return this.classes.getName()
  }

  /**
     * Component names.
     * Are added automatically during build
     *
     * Названия компонентов.
     * Добавляются автоматически во время сборки
     * @param name class name / название класса
     */
  setName (name) {
    this.name.value = name
    return this
  }

  /**
     * Modifying the list of subclasses
     *
     * Изменение списка подклассов
     * @param classes list of subclass values / список значений подкласса
     */
  setSubClasses (classes) {
    this.classes.setSubClasses(classes)
    return this
  }

  /**
     * Adding additional classes
     *
     * Добавление дополнительных классов
     * @param data list of additional classes / список дополнительных классов
     */
  setExtra (data) {
    this.classes.setExtra(data)
    return this
  }

  /**
     * Adding additional classes for the base class
     * Добавление дополнительных классов для базового класса
     * @param data list of additional classes / список дополнительных классов
     */
  setExtraMain (data) {
    this.classes.setExtraMain(data)
    return this
  }

  /**
     * Returns props
     *
     * Возвращает свойства (props)
     */
  getProps () {
    return this.props
  }

  /**
     * Returns the names of the user properties
     *
     * Возвращает название пользовательского свойства
     * @param names class name / название класса
     */
  getNameByVar (names) {
    return `--${this.getName()}${names.length > 0 ? `-${To_1.To.array(names).join('-')}` : ''}`
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

  /**
     * Execution method to replace setup in Vue
     *
     * Метод выполнения, для замены setup в Vue
     * @param dataCallback additional component properties / дополнительные свойства компонента
     */
  setup (dataCallback) {
    return {
      element: this.element,
      classes: this.classes.getItem(),
      styles: this.styles.getItem(),
      ...this.init(),
      ...((0, data_1.executeFunction)(dataCallback) || {})
    }
  }

  /**
     * Method for generating additional properties
     *
     * Метод для генерации дополнительных свойств
     * @protected
     */
  init () {
    return {}
  }
}
exports.Design = Design
// # sourceMappingURL=Design.js.map
