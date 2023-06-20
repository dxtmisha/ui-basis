'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.EventItem = void 0
const vue_1 = require('vue')
const To_1 = require('./To')
const ElementItem_1 = require('./ElementItem')
/**
 * Class for working with events
 *
 * Класс для работа с события
 */
class EventItem {
  callback
  /**
     * A case-sensitive string representing the event type to listen for
     *
     * Чувствительная к регистру строка, представляющая тип обрабатываемого события
     * @protected
     */
  type = (0, vue_1.ref)(['click'])
  /**
     * Element
     *
     * Элемент
     * @protected
     */
  element
  /**
     * Element for checking. If the element is missing in the DOM, the event is turned off
     *
     * Элемент для проверки. Если элемент отсутствует в DOM, событие выключается
     * @protected
     */
  dom
  /**
     * An object that, in addition of the properties defined in Event()
     *
     * Объект, который помимо свойств, определенных в Event()
     * @protected
     */
  options
  /**
     * An event-dependent value associated with the event
     *
     * Зависимое от события значение, связанное с событием
     * @protected
     */
  detail
  /**
     * A boolean value indicating that the listener should be invoked at most once after
     * being added. If true, the listener would be automatically removed when invoked
     *
     * Указывает, что обработчик должен быть вызван не более одного раза после добавления.
     * Если true, обработчик автоматически удаляется при вызове
     * @protected
     */
  once
  /**
     * Event states
     *
     * Состояния события
     * @protected
     */
  activity = false
  /**
     * The object that receives a notification (an object that implements the Event interface)
     * when an event of the specified type occurs. This must be null, an object with a
     * handleEvent() method, or a JavaScript function
     *
     * Объект, который принимает уведомление, когда событие указанного типа произошло.
     * Это должен быть объект, реализующий интерфейс EventListener или просто функция JavaScript
     * @protected
     */
  elementCallback
  /**
     * Classes Constructor
     *
     * Конструктор
     * @param element element / элемент
     * @param callback the object that receives a notification (an object that implements the
     * Event interface) when an event of the specified type occurs / Объект, который принимает
     * уведомление, когда событие указанного типа произошло
     */
  constructor (element, callback = () => undefined) {
    this.callback = callback
    this.element = new ElementItem_1.ElementItem(element)
    this.elementCallback = (event) => this.listener(event);
    (0, vue_1.watch)([this.type, this.element.item], ([newType, newElement], [oldType, oldElement]) => {
      if (this.activity &&
                newElement !== oldElement) {
        oldType.forEach(type => this.removeEvent(type, oldElement))
        newType.forEach(type => this.addEvent(type, newElement))
      }
    })
  }

  /**
     * Checking if an element is still in the DOM
     *
     * Проверка, находится ли элемент еще в DOM
     */
  isDom () {
    return this.dom ? this.dom.isDom() : this.element.isDom()
  }

  /**
     * Changes the element for control
     *
     * Изменяет элемент для контроля
     * @param value element / элемент
     */
  setDom (value) {
    this.dom = new ElementItem_1.ElementItem(value)
    return this
  }

  /**
     * Changes the type of the handled event
     *
     * Изменяет тип обрабатываемого события
     * @param value type / тип
     */
  setType (value) {
    this.type.value = To_1.To.array(value)
    return this
  }

  /**
     * Modifies the object that receives the notification
     *
     * Модифицирует объект, который получает уведомление
     * @param value
     */
  setCallback (value) {
    this.callback = value
    return this
  }

  /**
     * Modifying the options object that defines the characteristics of an object
     *
     * Изменение объекта options, который определяет характеристики объекта
     * @param value object that specifies characteristics / объект options
     */
  setOptions (value) {
    this.options = value
    return this
  }

  /**
     * Modifying a dependent value for the dispatch method
     *
     * Изменение зависимого значения для метода dispatch
     * @param detail an event-dependent value associated with the event / зависимое от события
     * значение, связанное с событием
     */
  setDetail (detail) {
    this.detail = detail
    return this
  }

  /**
     * Event initialization
     *
     * Инициализация события
     * @param event an object based on Event describing the event that has occurred,
     * and it returns nothing / событие DOM Event для которого регистрируется обработчик
     * @protected
     */
  listener (event) {
    if (this.isDom()) {
      if (this.once) {
        this.once = undefined
        this.stop()
      }
      return this.callback.call(this.element.get(), event)
    } else {
      this.stop()
    }
  }

  /**
     * Starting event listening
     *
     * Запуск прослушивания события
     */
  go () {
    if (!this.activity) {
      this.activity = true
      this.type.value.forEach(type => this.addEvent(type))
    }
    return this
  }

  /**
     * Trigger an event only once
     *
     * Активировать событие только 1 раз
     */
  goOnce () {
    this.once = true
    this.go()
    return this
  }

  /**
     * Stopping event listening
     *
     * Остановка прослушивания события
     */
  stop () {
    if (this.activity) {
      this.activity = false
      this.type.value.forEach(type => this.removeEvent(type))
    }
    return this
  }

  /**
     * Toggling event handler state
     *
     * Переключение состояния работы события
     * @param activity event activation / активация события
     */
  toggle (activity) {
    if (activity === undefined) {
      return this.activity
        ? this.stop()
        : this.go()
    } else {
      return activity
        ? this.go()
        : this.stop()
    }
  }

  /**
     * The method of the EventTarget sends an Event to the object, (synchronously) invoking
     * the affected EventListeners in the appropriate order
     *
     * Отправляет событие в общую систему событий. Это событие подчиняется тем же правилам
     * поведения "Захвата" и "Всплывания" как и непосредственно инициированные события
     * @param detail an event-dependent value associated with the event / зависимое от события
     * значение, связанное с событием
     */
  dispatch (detail = this.detail) {
    this.type.value.forEach(type => this.element.get()?.dispatchEvent(new CustomEvent(type, { detail })))
    return this
  }

  /**
     * Attaching an event to the current element
     *
     * Подключение события к текущему элементу
     * @param type a case-sensitive string representing the event type to listen for /
     * чувствительная к регистру строка, представляющая тип обрабатываемого события
     * @param element element for event registration / элемент для регистрации события
     * @private
     */
  addEvent (type, element) {
    (element || this.element.get())?.addEventListener(type, this.elementCallback, this.options)
    return this
  }

  /**
     * Removing an event from the current element
     *
     * Удаление события у текущего элемента
     * @param type a case-sensitive string representing the event type to listen for /
     * чувствительная к регистру строка, представляющая тип обрабатываемого события
     * @param element element to remove an event from / элемент для удаления события
     * @private
     */
  removeEvent (type, element) {
    (element || this.element.get())?.removeEventListener(type, this.elementCallback, this.options)
    return this
  }

  /**
     * Остановить прослушивания события в глубину
     * @param event
     */
  static stopPropagation (event) {
    event.preventDefault()
    event.stopPropagation()
  }

  /**
     * Returns the position of the mouse cursor or the location of the click
     *
     * Возвращает позицию курсора мыши или место нажатия
     * @param event event object / объект события
     */
  static client (event) {
    return {
      x: this.clientX(event),
      y: this.clientY(event)
    }
  }

  /**
     * Returns the position of the mouse cursor or the location of the click (X)
     *
     * Возвращает позицию курсора мыши или место нажатия (X)
     * @param event event object / объект события
     */
  static clientX (event) {
    return event?.clientX || event?.targetTouches?.[0].clientX || event?.touches?.[0].clientX || 0
  }

  /**
     * Returns the position of the mouse cursor or the location of the click (Y)
     *
     * Возвращает позицию курсора мыши или место нажатия (Y)
     * @param event event object / объект события
     */
  static clientY (event) {
    return event?.clientY || event?.targetTouches?.[0].clientY || event?.touches?.[0].clientY || 0
  }
}
exports.EventItem = EventItem
// # sourceMappingURL=EventItem.js.map
