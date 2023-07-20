'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Design = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
const ref_1 = require('../functions/ref')
const To_1 = require('./To')
const DesignClasses_1 = require('./DesignClasses')
const DesignProperties_1 = require('./DesignProperties')
const DesignStyles_1 = require('./DesignStyles')
const DesignComponents_1 = require('./DesignComponents')
/**
 * Main class for binding tokens and Vue components
 *
 * Основной класс для связывания токенов и компонентов Vue
 */
class Design {
  props
  /**
     * Class name
     *
     * Название класса
     * @protected
     */
  name = (0, vue_1.ref)('design-component')
  /**
     * List of connected components
     *
     * Список подключенных компонентов
     * @protected
     */
  components
  element = (0, vue_1.ref)()
  refs
  setupItem
  context
  attrs
  slots
  emit
  expose
  properties
  classes
  styles
  /**
     * Constructor
     * @param props properties / свойства
     * @param contextEmit additional property / дополнительное свойство
     */
  constructor (props, contextEmit) {
    this.props = props
    this.refs = (0, vue_1.toRefs)(props)
    this.properties = new DesignProperties_1.DesignProperties()
    this.components = new DesignComponents_1.DesignComponents()
    this.context = this.initContext(contextEmit)
    this.attrs = this.context.attrs
    this.slots = this.context.slots
    this.emit = this.context.emit
    this.expose = this.context.expose
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
     * Returns the names of the design
     *
     * Возвращает названия дизайна
     */
  getNameDesign () {
    return this.classes.getName().split('-', 2)?.[0]
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
     * Adding additional styles
     * Добавление дополнительных стилей
     * @param data list of additional styles / список дополнительных стилей
     */
  setExtraStyles (data) {
    this.styles.setExtra(data)
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
     * Changing the list of connected components
     *
     * Изменение списка подключенных компонентов
     * @param components list of connected components / список подключенных компонентов
     */
  setComponents (components) {
    this.components.set(components)
    return this
  }

  /**
     * A method for generating properties for a subcomponent
     *
     * Метод для генерации свойств для под компонента
     * @param value input value. Can be an object if you need to pass multiple
     * properties / входное значение. Может быть объектом, если надо передать
     * несколько свойств
     * @param nameExtra additional parameter or property name / дополнительный параметр или имя свойства
     * @param name property name / имя свойства
     */
  getBind (value, nameExtra = {}, name = 'value') {
    return Design.getBindStatic(value, nameExtra, name)
  }

  /**
     * A method for generating properties for a subcomponent
     *
     * Метод для генерации свойств для под компонента
     * @param value input value. Can be an object if you need to pass multiple
     * properties / входное значение. Может быть объектом, если надо передать
     * несколько свойств
     * @param nameExtra additional parameter or property name / дополнительный параметр или имя свойства
     * @param name property name / имя свойства
     */
  static getBindStatic (value, nameExtra = {}, name = 'value') {
    return (0, vue_1.computed)(() => {
      const isName = typeof nameExtra === 'string'
      const index = isName ? nameExtra : name
      const extra = isName ? {} : (0, ref_1.getRef)(nameExtra)
      if (value.value &&
                typeof value.value === 'object' &&
                index in value.value) {
        return {
          ...extra,
          ...value.value
        }
      } else {
        return {
          ...extra,
          [index]: value.value
        }
      }
    })
  }

  /**
     * Returns the basic data processed in setup
     *
     * Возвращает базовые данные, обрабатываемые в setup
     */
  getSetup () {
    return this.setupItem
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
    const slots = this.context.slots
    if (slots?.[name] &&
            typeof slots[name] === 'function') {
      const slot = slots[name](props)
      if (children) {
        children.push(slot)
      }
      return slot
    }
    return undefined
  }

  /**
     * Execution method to replace setup in Vue
     *
     * Метод выполнения, для замены setup в Vue
     * @param dataCallback additional component properties / дополнительные свойства компонента
     */
  setup (dataCallback) {
    this.initSetupItem()
    return {
      ...(this.getSetup()),
      ...((0, data_1.executeFunction)(dataCallback) || {})
    }
  }

  /**
     * The rendering method for the setup method
     *
     * Метод рендеринга для метода настройки
     */
  render () {
    this.initSetupItem()
    return () => this.initRender()
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

  /**
     * Initialization of all the necessary properties for work
     *
     * Инициализация всех необходимых свойств для работы
     * @protected
     */
  initSetupItem () {
    if (!this.setupItem) {
      this.setupItem = {
        element: this.element,
        classes: this.classes.getItem(),
        styles: this.styles.getItem(),
        ...this.init()
      }
      if (process.env.NODE_ENV !== 'production') {
        // onMounted(() => console.warn(`Mounted: ${this.getName()}`))
        (0, vue_1.onUpdated)(() => console.warn(`Updated: ${this.getName()}`, this.element?.value))
      }
    }
  }

  /**
     * A method for rendering
     *
     * Метод для рендеринга
     * @protected
     */
  initRender () {
    return (0, vue_1.h)('div', { class: this.setupItem?.classes.value.main })
  }

  /**
     * Checks the values of the input context and converts them to the required format
     *
     * Проверяет значения входного context и преобразует в нужный формат
     * @param contextEmit checked values / проверяемые значения
     * @protected
     */
  initContext (contextEmit) {
    if (contextEmit &&
            typeof contextEmit === 'object' &&
            'attrs' in contextEmit &&
            'slots' in contextEmit) {
      return contextEmit
    } else {
      return {
        attrs: (0, vue_1.useAttrs)(),
        slots: (0, vue_1.useSlots)(),
        emit: contextEmit || ((name, ...agr) => console.error(name, agr)),
        expose: vue_1.defineExpose
      }
    }
  }
}
exports.Design = Design
// # sourceMappingURL=Design.js.map
