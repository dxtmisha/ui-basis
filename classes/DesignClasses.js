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
  props
  properties
  extra
  subclasses
  /**
     * Constructor
     * @param name class name / название класса
     * @param props properties / свойства
     * @param properties list of available properties / список доступных свойств
     * @param subclasses list of subclasses / Список подклассов
     * @param extra additional classes / дополнительные классы
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (name, props, properties, subclasses, extra) {
    this.name = name
    this.props = props
    this.properties = properties
    this.extra = extra
    this.subclasses = this.initSubclasses(name, subclasses)
  }

  /**
     * An object with a full list of classes for work
     *
     * Объект с полным списком классов для работы
     */
  classes = (0, vue_1.computed)(() => {
    return {
      main: [
        ...this.main.value,
        ...this.getClassesProperties()
      ],
      ...this.subclasses
    }
  })

  /**
     * An object containing all the classes for working with basic data types
     *
     * Объект, содержащий все классы для работы с базовыми типами данных
     * @private
     */
  main = (0, vue_1.computed)(() => {
    const classes = [this.name]
    if (this.extra) {
      (0, data_1.forEach)((0, ref_1.getRef)(this.extra), (item, name) => {
        if ((0, ref_1.getRef)(item)) {
          classes.push(this.getCustomName(name))
        }
      })
    }
    return classes
  })

  /**
     * Returns a list of all active classes
     *
     * Возвращает список всех активных классов
     */
  get () {
    return this.classes.value
  }

  /**
     * Returns the base class name
     *
     * Возвращает базовое название класса
     */
  getName () {
    return this.name
  }

  /**
     * Returns the class names for the status
     *
     * Возвращает название класса для статуса
     * @param names class name / название класса
     */
  getNameByState (names) {
    return this.jsonState([this.name, ...names])
  }

  /**
     * Возвращает название класса для подкласса
     *
     * Returns the class names for the subclass
     * @param names class name / название класса
     */
  getNameBySubclass (names) {
    return this.jsonSubclass([this.name, ...names])
  }

  /**
     * Returns the names of classes and their values by the list
     *
     * Возвращает название классов и их значения по списку
     * @param values list of classes and their names / список классов и их названия
     */
  getListByState (values) {
    return (0, vue_1.computed)(() => (0, data_1.forEach)(values, (item, index) => {
      if ((0, ref_1.getRef)(item)) {
        return this.getNameByState([index.toString()])
      }
      return undefined
    }, true))
  }

  /**
     * Concatenates class names into a string for state classes
     *
     * Соединяем названия классов в строку для классов состояния
     * @param classes array to class name / массив в название класса
     */
  jsonState (classes) {
    return classes.join('--')
  }

  /**
     * Concatenates class names into a string for additional classes
     *
     * Соединяем названия классов в строку для дополнительных классов
     * @param classes array to class name / массив в название класса
     */
  jsonSubclass (classes) {
    return classes.join('__')
  }

  /**
     * Initialization of subclasses and their return
     *
     * Инициализация подклассов и возвращение их
     * @param name base class name / базовое название класса
     * @param subclasses list of subclasses / список подклассов
     * @private
     */
  initSubclasses (name, subclasses) {
    if (subclasses) {
      const list = {};
      (0, data_1.forEach)(subclasses, (className, index) => {
        list[index] = this.jsonSubclass([name, className])
      })
      return list
    } else {
      return {}
    }
  }

  /**
     * List of active state classes
     *
     * Список активных классов состояний
     * @private
     */
  getClassesProperties () {
    return CacheLive_1.CacheLive.get(this.getPropsActive(), () => (0, data_1.forEach)(this.properties.get(), item => [...this.getClassList(item)]))
  }

  /**
     * Returns a string for the cache of the element state
     *
     * Возвращает строку для кэша состояния элемента
     * @private
     */
  getPropsActive () {
    let data = this.name
    this.properties.get()
      .forEach(({ name }) => {
        if (this.props?.[name]) {
          data += `|${name}:${this.props[name]}`
        }
      })
    return data
  }

  /**
     * Generating a class name based on its property
     *
     * Формирование названия класса по его свойству
     * @param item current property / текущее свойство
     * @param className array of class names / массив с названиями классов
     * @private
     */
  getClassList (item, className = [this.name]) {
    const prop = this.props?.[item.name]
    const is = this.properties.isValue(item, prop)
    const list = []
    className = [...this.getClassNameByList(item, [...className, item.index])]
    if ((is && (prop === true ||
            this.properties.isBool(item)) &&
            this.checkByCategory(item)) ||
            this.properties.isExceptions(item, prop)) {
      list.push(this.jsonState(className))
    }
    if (is) {
      if (typeof prop === 'string') {
        list.push(this.jsonState([...className, prop]))
      } else if (this.checkByCategory(item)) {
        item.state?.forEach(state => list.push(...this.getClassList(state, className)))
      }
    } else if (this.properties.isStyle(item, prop)) {
      list.push(this.jsonState([...className, KEY_CLASS_CUSTOM]))
    }
    return list
  }

  /**
     * Returns the class name for the current element
     *
     * Возвращает имя класса для текущего элемента
     * @param item current property / текущее свойство
     * @param className array of class names / массив с названиями классов
     * @private
     */
  getClassNameByList (item, className) {
    if ('className' in item && item?.className) {
      return [item.className]
    } else {
      return className
    }
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
      return this.getNameByState([name.replace(/^\?\?/, '')])
    } else {
      return name
    }
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
        for (const property of this.properties.getByCategory(category)) {
          if (item.name !== property.name &&
                        this.props?.[property.name]) {
            return false
          }
        }
      }
    }
    return true
  }
}
exports.DesignClasses = DesignClasses
// # sourceMappingURL=DesignClasses.js.map
