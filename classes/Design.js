'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Design = void 0
const DesignProperties_1 = require('./DesignProperties')
const DesignClasses_1 = require('./DesignClasses')
const DesignStyles_1 = require('./DesignStyles')
/**
 * Class for managing data from tokens
 *
 * Класс для управления данными из токенов
 */
class Design {
  properties
  classes
  styles
  /**
     * Constructor
     * @param name class name / название класса
     * @param props properties / свойства
     * @param map list of available properties / список доступных свойств
     * @param options list of additional parameters / список дополнительных параметров
     */
  constructor (name, props, map, options) {
    this.properties = new DesignProperties_1.DesignProperties(map)
    this.classes = new DesignClasses_1.DesignClasses(name, props, this.properties, options?.subclasses, options?.extra)
    this.styles = new DesignStyles_1.DesignStyles(name, props, this.properties, options?.styles)
  }

  /**
     * Returns data for classes
     *
     * Возвращает данные для классов
     */
  getClasses () {
    return this.classes.get()
  }

  /**
     * Returns data for classes
     *
     * Возвращает данные для классов
     */
  getClassesRef () {
    return this.classes.classes
  }

  /**
     * Returns the class names for the status
     *
     * Возвращает название класса для статуса
     * @param names class name / название класса
     */
  getClassesByState (names) {
    return this.classes.getNameByState(names)
  }

  /**
     * Returns the class names for the status
     *
     * Возвращает название класса для статуса
     * @param names class name / название класса
     */
  getClassesBySubclass (names) {
    return this.classes.getNameBySubclass(names)
  }

  /**
     * Returns data for styles
     *
     * Возвращает данные для стилей
     */
  getStyles () {
    return this.styles.get()
  }

  /**
     * Returns data for styles
     *
     * Возвращает данные для стилей
     */
  getStylesRef () {
    return this.styles.styles
  }
}
exports.Design = Design
// # sourceMappingURL=Design.js.map
