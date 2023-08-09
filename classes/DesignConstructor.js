'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.DesignConstructor = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
const To_1 = require('./To')
const Design_1 = require('./Design')
const DesignComponents_1 = require('./DesignComponents')
/**
 * Class for collecting all functional components
 *
 * Класс для сбора всех функциональных компонентов
 */
class DesignConstructor {
  props
  emits
  name
  element = (0, vue_1.ref)()
  refs
  attrs
  slots
  options
  design
  components
  /**
     * Constructor
     * @param name class name / название класса
     * @param props properties / свойства
     * @param options list of additional parameters / список дополнительных параметров
     * @param emits function for calling an event / функция для вызова события
     */
  constructor (name, props, options, emits) {
    this.props = props
    this.emits = emits
    this.name = To_1.To.kebabCase(name)
    this.refs = (0, vue_1.toRefs)(this.props)
    this.attrs = (0, vue_1.useAttrs)()
    this.slots = (0, vue_1.useSlots)()
    this.options = options || {}
  }

  init () {
    Object.assign(this.options, this.initOptions())
    this.initDesign(this.options)
    this.initComponents(this.options)
  }

  /**
     * Initialization of basic options
     *
     * Инициализация базовых опций
     * @protected
     */
  initOptions () {
    return {}
  }

  /**
     * Initialization of all the necessary properties for work
     *
     * Инициализация всех необходимых свойств для работы
     * @protected
     */
  initSetup () {
    return {}
  }

  /**
     * A method for rendering
     *
     * Метод для рендеринга
     * @protected
     */
  initRender () {
    return (0, vue_1.h)('div', {
      ref: this.element,
      class: this.design?.getClasses().main
    })
  }

  /**
     * Returns the full name of the component
     *
     * Возвращает полное название компонента
     */
  getName () {
    return this.name
  }

  /**
     * Returns the names of the design
     *
     * Возвращает названия дизайна
     */
  getDesignName () {
    return this.name.split('-', 2)?.[0]
  }

  /**
     * Returns the name of the component
     *
     * Возвращает название компонента
     */
  getComponentName () {
    return this.name.split('-', 2)?.[1]
  }

  /**
     * Returns the names of the user properties
     *
     * Возвращает название пользовательского свойства
     * @param names class name / название класса
     */
  getVarName (names) {
    return `--${this.name}-sys-${names.length > 0 ? `-${To_1.To.array(names).join('-')}` : ''}`
  }

  /**
     * Returns the input property
     *
     * Возвращает входное свойство
     */
  getProps () {
    return this.props
  }

  /**
     * Returns the used classes and styles
     *
     * Возвращает использованные классы и стили
     */
  getDesign () {
    return {
      classes: this.design?.getClassesRef(),
      styles: this.design?.getStylesRef()
    }
  }

  /**
     * Execution method to replace setup in Vue
     *
     * Метод выполнения, для замены setup в Vue
     */
  setup () {
    return {
      name: this.name,
      element: this.element,
      ...this.getDesign(),
      ...this.initSetup()
    }
  }

  /**
     * The rendering method for the setup method
     *
     * Метод рендеринга для метода настройки
     */
  render () {
    return () => this.initRender()
  }

  /**
     * List of available external variables
     *
     * Список доступных переменных извне
     */
  expose () {
    return {}
  }

  /**
     * Initializes the slot
     *
     * Инициализирует слот
     * @param children if you pass this element, the slot will be added to it / если передать
     * @param name slot name / название слота
     * @param props property for the slot / свойство для слота
     * этот элемент, то слот добавится в него
     * @protected
     */
  readSlot (name, props = {}, children) {
    if (this.slots &&
            name in this.slots &&
            typeof this.slots[name] === 'function') {
      const read = this.slots[name](props)
      if (children) {
        children.push(read)
      }
      return read
    }
    return undefined
  }

  /**
     * Initialization of a class for working with design tokens
     *
     * Инициализация класса для работы с дизайн-токенами
     * @private
     */
  initDesign (options) {
    if (options &&
            options?.map &&
            (0, data_1.isFilled)(options.map)) {
      this.design = new Design_1.Design(this.name, this.props, options.map, options)
    }
  }

  /**
     * Initialization of a class for working with input components
     *
     * Инициализация класса для работы с входными компонентами
     * @private
     */
  initComponents (options) {
    if (options &&
            options?.components &&
            (0, data_1.isFilled)(options.components)) {
      this.components = new DesignComponents_1.DesignComponents(options.components, options?.modification)
    }
  }

  /**
     * Initializes the slot
     *
     * Инициализирует слот
     * @param name slot name / название слота
     * @param children if you pass this element, the slot will be added to it / если передать
     * @param props property for the slot / свойство для слота
     * этот элемент, то слот добавится в него
     */
  initSlot (name, children, props = {}) {
    if (this.slots &&
            this.slots?.[name] &&
            typeof this.slots[name] === 'function') {
      const slot = this.slots[name](props)
      if (children) {
        children.push(slot)
      }
      return slot
    }
    return undefined
  }
}
exports.DesignConstructor = DesignConstructor
// # sourceMappingURL=DesignConstructor.js.map
