import { Ref, ref, watch } from 'vue'

import { To } from './To'
import { ElementItem, ElementItemType, ElementRefType } from './ElementItem'

import { AssociativeType, coordinatorType, ElementType } from '../constructors/types'

export type EventCallbackType<R = any, E = Event> = ((event?: E) => R) & EventListener
export type EventCallbackRequiredType<R = any, E = Event> = (event: E) => R
export type EventCallbackVoidType = () => void | undefined
export type EventOptionsType = AddEventListenerOptions | boolean | undefined

/**
 * Class for working with events
 *
 * Класс для работа с события
 */
export class EventItem<R = any, E = Event, D = AssociativeType> {
  /**
   * A case-sensitive string representing the event type to listen for
   *
   * Чувствительная к регистру строка, представляющая тип обрабатываемого события
   * @protected
   */
  protected readonly type = ref(['click']) as Ref<string[]>

  /**
   * Element
   *
   * Элемент
   * @protected
   */
  protected readonly element: ElementItem

  /**
   * Element for checking. If the element is missing in the DOM, the event is turned off
   *
   * Элемент для проверки. Если элемент отсутствует в DOM, событие выключается
   * @protected
   */
  protected dom?: ElementItem

  /**
   * An object that, in addition of the properties defined in Event()
   *
   * Объект, который помимо свойств, определенных в Event()
   * @protected
   */
  protected options?: EventOptionsType

  /**
   * An event-dependent value associated with the event
   *
   * Зависимое от события значение, связанное с событием
   * @protected
   */
  protected detail?: D

  /**
   * A boolean value indicating that the listener should be invoked at most once after
   * being added. If true, the listener would be automatically removed when invoked
   *
   * Указывает, что обработчик должен быть вызван не более одного раза после добавления.
   * Если true, обработчик автоматически удаляется при вызове
   * @protected
   */
  protected once?: boolean

  /**
   * Event states
   *
   * Состояния события
   * @protected
   */
  protected activity = false as boolean

  /**
   * The object that receives a notification (an object that implements the Event interface)
   * when an event of the specified type occurs. This must be null, an object with a
   * handleEvent() method, or a JavaScript function
   *
   * Объект, который принимает уведомление, когда событие указанного типа произошло.
   * Это должен быть объект, реализующий интерфейс EventListener или просто функция JavaScript
   * @protected
   */
  protected elementCallback: EventCallbackType<R, E>

  /**
   * Classes Constructor
   *
   * Конструктор
   * @param element element / элемент
   * @param callback the object that receives a notification (an object that implements the
   * Event interface) when an event of the specified type occurs / Объект, который принимает
   * уведомление, когда событие указанного типа произошло
   */
  constructor (
    element: ElementRefType,
    protected callback = (() => undefined) as EventCallbackType<R, E>
  ) {
    this.element = new ElementItem(element)
    this.elementCallback = ((event: E) => this.listener(event)) as EventCallbackType<R, E>

    watch([this.type, this.element.item], (
      [newType, newElement]: [string[], ElementItemType],
      [oldType, oldElement]: [string[], ElementItemType]
    ) => {
      if (
        this.activity &&
        newElement !== oldElement
      ) {
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
  isDom (): boolean {
    return this.dom ? this.dom.isDom() : this.element.isDom()
  }

  /**
   * Changes the element for control
   *
   * Изменяет элемент для контроля
   * @param value element / элемент
   */
  setDom (value: ElementRefType): this {
    this.dom = new ElementItem(value)

    return this
  }

  /**
   * Changes the type of the handled event
   *
   * Изменяет тип обрабатываемого события
   * @param value type / тип
   */
  setType (value: string | string[]): this {
    this.type.value = To.array(value)
    return this
  }

  /**
   * Modifies the object that receives the notification
   *
   * Модифицирует объект, который получает уведомление
   * @param value
   */
  setCallback (value: EventCallbackType<R, E>): this {
    this.callback = value
    return this
  }

  /**
   * Modifying the options object that defines the characteristics of an object
   *
   * Изменение объекта options, который определяет характеристики объекта
   * @param value object that specifies characteristics / объект options
   */
  setOptions (value: EventOptionsType): this {
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
  setDetail (detail: D): this {
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
  protected listener (event: E): R | void {
    if (this.isDom()) {
      if (this.once) {
        this.once = undefined
        this.stop()
      }

      return this.callback.call(this.element.get(), event as E & Event)
    } else {
      this.stop()
    }
  }

  /**
   * Starting event listening
   *
   * Запуск прослушивания события
   */
  go (): this {
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
  goOnce (): this {
    this.once = true
    this.go()

    return this
  }

  /**
   * Stopping event listening
   *
   * Остановка прослушивания события
   */
  stop (): this {
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
  toggle (activity?: boolean): this {
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
  dispatch (detail: D | undefined = this.detail): this {
    this.type.value.forEach(
      type => this.element.get()?.dispatchEvent(new CustomEvent(type, { detail }))
    )

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
  private addEvent (type: string, element?: ElementType): this {
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
  private removeEvent (type: string, element?: ElementType): this {
    (element || this.element.get())?.removeEventListener(type, this.elementCallback, this.options)
    return this
  }

  /**
   * Остановить прослушивания события в глубину
   * @param event
   */
  static stopPropagation (event: Event): void {
    event.preventDefault()
    event.stopPropagation()
  }

  /**
   * Returns the position of the mouse cursor or the location of the click
   *
   * Возвращает позицию курсора мыши или место нажатия
   * @param event event object / объект события
   */
  static client (event: MouseEvent & TouchEvent): coordinatorType {
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
  static clientX (event: MouseEvent & TouchEvent): number {
    return event?.clientX || event?.targetTouches?.[0].clientX || event?.touches?.[0].clientX || 0
  }

  /**
   * Returns the position of the mouse cursor or the location of the click (Y)
   *
   * Возвращает позицию курсора мыши или место нажатия (Y)
   * @param event event object / объект события
   */
  static clientY (event: MouseEvent & TouchEvent): number {
    return event?.clientY || event?.targetTouches?.[0].clientY || event?.touches?.[0].clientY || 0
  }
}
