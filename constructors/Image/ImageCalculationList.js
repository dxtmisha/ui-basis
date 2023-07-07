'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ImageCalculationList = void 0
const ImageCalculation_1 = require('./ImageCalculation')
/**
 * Class for managing all ImageCalculation objects
 *
 * Класс для управления всеми объектами ImageCalculation
 */
class ImageCalculationList {
  static items = []
  /**
     * Если у элемента есть размер
     *
     * If the element has a size
     */
  static isSize () {
    return this.items.find(item => item.isSize()) !== undefined
  }

  /**
     * Returning an object for calculation by its name
     *
     * Возвращение объекта для вычисления по его имени
     * @param name group name / название группы
     */
  static get (name) {
    return this.find(name) || this.init(name)
  }

  /**
     * Updating all records for all groups
     *
     * Обновление всех записей у всех групп
     */
  static reset () {
    this.items.forEach(item => item.reset())
  }

  /**
     * Поиск значения по названия группа
     * @param name group name / название группы
     */
  static find (name) {
    return this.items.find(item => item.is(name))
  }

  /**
     * Creating a new object
     *
     * Создание нового объекта
     * @param name group name / название группы
     * @protected
     */
  static init (name) {
    const item = new ImageCalculation_1.ImageCalculation(name)
    this.items.push(item)
    return item
  }
}
exports.ImageCalculationList = ImageCalculationList
// # sourceMappingURL=ImageCalculationList.js.map
