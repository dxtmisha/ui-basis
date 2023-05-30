'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.EventResize = void 0
const vue_1 = require('vue')
const ElementItem_1 = require('./ElementItem')
const EventItem_1 = require('./EventItem')
/**
 * The ResizeObserver interface reports changes to the dimensions of an Element's
 * content or border box, or the bounding box of an SVGElement
 *
 * Интерфейс ResizeObserver отслеживает изменения размеров содержимого или рамки
 * элемента, или ограничивающего прямоугольника SVGElement
 */
class EventResize {
  callback
  element
  activity = false
  event
  observer
  constructor (element, callback = () => undefined) {
    this.callback = callback
    this.element = new ElementItem_1.ElementItem(element);
    (0, vue_1.watch)(this.element.item, (newElement, oldElement) => {
      if (this.activity &&
                this.isObserver() &&
                newElement !== oldElement) {
        this.removeEvent().addEvent(newElement)
      }
    })
  }

  /**
     * Checks if the ResizeObserver object exists
     *
     * Проверяет, существует ли объект ResizeObserver
     */
  isObserver () {
    return 'ResizeObserver' in window
  }

  /**
     * The observe() method of the ResizeObserver interface starts observing the
     * specified Element or SVGElement
     *
     * Метод observe() интерфейса ResizeObserver запускает наблюдение за указанным
     * элементом (Element) или графическим элементом SVG (SVGElement)
     */
  go () {
    if (!this.activity) {
      this.activity = true
      this.addEvent(this.element.get())
    }
    return this
  }

  /**
     * The disconnect() method of the ResizeObserver interface unobserves all
     * observed Element or SVGElement targets
     *
     * Метод disconnect() интерфейса ResizeObserver прекращает наблюдение за всеми
     * отслеживаемыми элементами (Element) или графическими элементами SVG (SVGElement)
     */
  stop () {
    if (this.activity) {
      this.removeEvent()
      this.activity = false
    }
    return this
  }

  /**
     * Returns the ResizeObserver object
     *
     * Возвращает объект ResizeObserver
     * @protected
     */
  getObserver () {
    if (!this.observer &&
            this.isObserver()) {
      if (this.isObserver()) {
        this.observer = new ResizeObserver(() => this.initCallback())
      }
    }
    return this.observer
  }

  /**
     * If the ResizeObserver class is not supported, the standard window resize
     * event is initialized
     *
     * Если класс ResizeObserver не поддерживается, происходит инициализация
     * стандартного события изменения размера окна
     * @protected
     */
  getEvent () {
    if (!this.event) {
      this.event = new EventItem_1.EventItem(window, () => this.initCallback())
        .setDom(this.element.item)
        .setType(['resize'])
    }
    return this.event
  }

  /**
     * Initialization of the output function
     *
     * Инициализация функции вывода
     * @protected
     */
  initCallback () {
    this.callback.call(this.element.get())
  }

  /**
     * Attaching an event listener
     *
     * Подключение прослушивания события
     * @param element Element to listen to / Элемент для прослушивания
     * @private
     */
  addEvent (element) {
    if (element) {
      if (this.isObserver()) {
        this.getObserver()?.observe(element)
      } else {
        this.getEvent().go()
      }
    }
    return this
  }

  /**
     * Removing an event listener
     *
     * Удаление прослушивания события
     * @private
     */
  removeEvent () {
    if (this.isObserver()) {
      this.getObserver()?.disconnect()
    } else {
      this.getEvent().stop()
    }
    return this
  }
}
exports.EventResize = EventResize
// # sourceMappingURL=EventResize.js.map
