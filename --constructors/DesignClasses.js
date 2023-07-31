'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.DesignClasses = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
const ref_1 = require('../functions/ref')
const CacheLive_1 = require('./CacheLive')
const KEY_CLASS_CUSTOM = 'custom'
/**
 * Class for working with classes in a component
 *
 * Класс для работы с классами в компоненте
 */
class DesignClasses {
  name
  properties
  props
  /**
     * List of subclasses
     *
     * Список подклассов
     * @protected
     */
  subClasses = (0, vue_1.ref)()
  /**
     * List of additional classes
     *
     * Список дополнительных классов
     * @protected
     */
  extra = (0, vue_1.ref)({})
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
     * Returns a list of all active classes
     *
     * Возвращает список всех активных классов
     */
  get () {
    return this.classes.value
  }

  /**
     * Returns a list of all active classes
     *
     * Возвращает список всех активных классов
     */
  getItem () {
    return this.classes
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
     * Returns the class names for the status
     *
     * Возвращает название класса для статуса
     * @param names class name / название класса
     */
  getNameByState (names) {
    return this.jsonState([this.getName(), ...names])
  }

  /**
     * Returns the names of classes and their values by the list
     *
     * Возвращает название классов и их значения по списку
     * @param values list of classes and their names / список классов и их названия
     */
  getNameByStateByList (values) {
    const data = {};
    (0, data_1.forEach)(values, (item, index) => {
      data[this.getNameByState([index.toString()])] = item
    })
    return data
  }

  /**
     * Возвращает название класса для подкласса
     *
     * Returns the class names for the subclass
     * @param names class name / название класса
     */
  getNameBySubclass (names) {
    return this.jsonSubclass([this.getName(), ...names])
  }

  /**
     * Modifying the list of subclasses
     *
     * Изменение списка подклассов
     * @param classes list of subclass values / список значений подкласса
     */
  setSubClasses (classes) {
    this.subClasses.value = classes
    return this
  }

  /**
     * Adding additional classes
     *
     * Добавление дополнительных классов
     * @param data list of additional classes / список дополнительных классов
     */
  setExtra (data) {
    this.extra.value = data
    return this
  }

  /**
     * Adding additional classes for the base class
     * Добавление дополнительных классов для базового класса
     * @param data list of additional classes / список дополнительных классов
     */
  setExtraMain (data) {
    this.extra.value.main = data
    return this
  }

  /**
     * List of classes for data display control
     *
     * Список классов для управления отображением данных
     */
  setExtraState (values) {
    this.setExtraMain(this.getNameByStateByList(values))
    return this
  }

  /**
     * An object with a full list of classes for work
     *
     * Объект с полным списком классов для работы
     * @protected
     */
  classes = (0, vue_1.computed)(() => {
    return {
      main: {
        ...this.classesMain.value,
        ...this.getClassesProperties()
      },
      ...this.classesSubClasses.value
    }
  })

  /**
     * An object containing all the classes for working with basic data types
     *
     * Объект, содержащий все классы для работы с базовыми типами данных
     * @protected
     */
  classesMain = (0, vue_1.computed)(() => {
    return {
      [this.getName()]: true,
      ...this.getExtraByName('main')
    }
  })

  classesSubClasses = (0, vue_1.computed)(() => {
    const classBasic = this.getName()
    const classes = {}
    if (this.subClasses.value) {
      (0, data_1.forEach)(this.subClasses.value, (name, index) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        classes[index] = {
          [this.jsonSubclass([classBasic, name])]: true,
          ...this.getExtraByName('name')
        }
      })
    }
    return classes
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
    (0, data_1.forEach)((0, ref_1.getRef)(this.extra.value?.[name]), (item, index) => {
      extra[index] = (0, ref_1.getRef)((0, data_1.executeFunction)(item))
    })
    return extra
  }

  /**
     * Generating a class name based on its property
     *
     * Формирование названия класса по его свойству
     * @param item current property / текущее свойство
     * @param className array of class names / массив с названиями классов
     * @protected
     */
  toClassName (item, className = [this.getName()]) {
    const prop = this.props?.[item.name]
    const is = this.properties.isValue(item, prop)
    const classes = {}
    className.push(item.index)
    this.toClassNameByState(classes, item, className, (is && (prop === true ||
            this.properties.isBool(item)) &&
            this.checkByCategory(item)) ||
            this.properties.isExceptions(item, prop), !!prop && this.checkByCategory(item))
    if (is &&
            typeof prop === 'string') {
      classes[this.jsonState([...this.getClassName(item, className), prop])] = true
    } else if (this.properties.isStyle(item, prop)) {
      classes[this.jsonState([...this.getClassName(item, className), KEY_CLASS_CUSTOM])] = true
    }
    return classes
  }

  /**
     * A class for generating the class name recursively based on the state tree array
     *
     * Класс для генерации названия класса в глубину по массиву дерева состояния
     * @param data list of active classes / список активных классов
     * @param item current property / текущее свойство
     * @param className array of class names / массив с названиями классов
     * @param active fulfillment of the condition / выполненности условия
     * @param next conditions for further verification / условия для дальнейшей проверки
     * @protected
     */
  toClassNameByState (data, item, className, active, next) {
    const index = this.jsonState(this.getClassName(item, className))
    if (active) {
      data[index] = true
    }
    if (next) {
      item.state?.forEach(state => Object.assign(data, this.toClassName(state, [index])))
    }
    return this
  }

  /**
     * List of active state classes
     *
     * Список активных классов состояний
     * @protected
     */
  getClassesProperties () {
    const properties = this.properties.get()
    return CacheLive_1.CacheLive.get(this.getPropsActive(properties), () => {
      const data = {}
      properties?.forEach(item => Object.assign(data, this.toClassName(item)))
      return data
    })
  }

  /**
     * Returns the class name for the current element
     *
     * Возвращает имя класса для текущего элемента
     * @param item current property / текущее свойство
     * @param className array of class names / массив с названиями классов
     * @private
     */
  getClassName (item, className) {
    if ('className' in item && item.className) {
      return [item.className]
    } else {
      return className
    }
  }

  /**
     * Returns a string for the cache of the element state
     *
     * Возвращает строку для кэша состояния элемента
     * @param properties list of available properties / список доступных свойств
     * @private
     */
  getPropsActive (properties) {
    const data = [this.getName()]
    properties.forEach(({ name }) => {
      if (this.props?.[name]) {
        data.push(`${name}:${this.props[name]}`)
      }
    })
    return data.join('|')
  }

  /**
     * Checks if there are similar elements by property, if there are, then does not add a class for work
     *
     * Проверяет, есть ли схожие элементы по свойству, если есть, то не добавляет класс для работы
     * @param item current property / текущее свойство
     * @private
     */
  checkByCategory (item) {
    if (this.properties.isDefault(item)) {
      const category = this.properties.getCategoryName(item)
      if (category) {
        let active = true
        this.properties.getByCategory(category)
          ?.forEach(property => {
            if (item.name !== property.name &&
                        this.props?.[property.name]) {
              active = false
            }
          })
        return active
      }
    }
    return true
  }

  /**
     * Concatenates class names into a string for state classes
     *
     * Соединяем названия классов в строку для классов состояния
     * @param classes array to class name / массив в название класса
     * @private
     */
  jsonState (classes) {
    return classes.join('--')
  }

  /**
     * Concatenates class names into a string for additional classes
     *
     * Соединяем названия классов в строку для дополнительных классов
     * @param classes array to class name / массив в название класса
     * @private
     */
  jsonSubclass (classes) {
    return classes.join('__')
  }
}
exports.DesignClasses = DesignClasses
// # sourceMappingURL=DesignClasses.js.map
