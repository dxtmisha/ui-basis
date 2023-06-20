'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ElementItem = void 0
const vue_1 = require('vue')
const ref_1 = require('../functions/ref')
/**
 * Class for working with elements
 *
 * Класс для работы с элементами
 */
class ElementItem {
  element
  elementDefault
  // eslint-disable-next-line no-useless-constructor
  constructor (element, elementDefault) {
    this.element = element
    this.elementDefault = elementDefault
  }

  item = (0, vue_1.computed)(() => this.find((0, ref_1.getRef)(this.element)) || this.getBody())
  /**
     * Checking if an element is still in the DOM
     *
     * Проверка, находится ли элемент еще в DOM
     */
  isDom () {
    if (this.item.value === window) {
      return true
    } else {
      return !!this.item.value?.closest('html')
    }
  }

  /**
     * Returning an element
     *
     * Возвращение элемента
     */
  get () {
    return this.item.value
  }

  /**
     * If the element is a window object, returns the body object, otherwise returns
     * the element itself
     *
     * Если элемент является объектом window, возвращает объект body, в противном
     * случае возвращает сам элемент
     */
  getNotWindow () {
    return (this.item.value === window ? this.getBody() : this.item.value)
  }

  /**
     * The method of the Element interface returns the first element that is a descendant
     * of the element on which it is invoked that matches the specified group of selectors
     *
     * Метод интерфейса Element возвращает первый элемент, который является потомком элемента,
     * на котором он вызывается, и соответствует указанной группе селекторов
     * @param element element or string / элемент или строка
     * @private
     */
  find (element) {
    return (typeof element === 'string' ? document.querySelector(element) : element)
  }

  /**
     * Returns a default element
     *
     * Возвращает элемент по умолчанию
     * @private
     */
  getBody () {
    return this.elementDefault
  }
}
exports.ElementItem = ElementItem
// # sourceMappingURL=ElementItem.js.map
