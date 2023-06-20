import { watch } from 'vue'

import { ElementItem, ElementItemType, ElementRefType } from './ElementItem'
import { EventCallbackVoidType, EventItem } from './EventItem'

/**
 * The ResizeObserver interface reports changes to the dimensions of an Element's
 * content or border box, or the bounding box of an SVGElement
 *
 * Интерфейс ResizeObserver отслеживает изменения размеров содержимого или рамки
 * элемента, или ограничивающего прямоугольника SVGElement
 */
export class EventResize {
  protected readonly element: ElementItem

  protected activity = false as boolean
  protected event?: EventItem
  protected observer?: ResizeObserver

  constructor (
    element: ElementRefType,
    protected callback = (() => undefined) as EventCallbackVoidType
  ) {
    this.element = new ElementItem(element)

    watch(this.element.item, (newElement, oldElement) => {
      if (
        this.activity &&
        this.isObserver() &&
        newElement !== oldElement
      ) {
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
  go (): this {
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
  stop (): this {
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
  protected getObserver () {
    if (
      !this.observer &&
      this.isObserver()
    ) {
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
  protected getEvent () {
    if (!this.event) {
      this.event = new EventItem(window, () => this.initCallback())
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
  protected initCallback (): void {
    this.callback.call(this.element.get())
  }

  /**
   * Attaching an event listener
   *
   * Подключение прослушивания события
   * @param element element to listen to / элемент для прослушивания
   * @private
   */
  private addEvent (element?: ElementItemType): this {
    if (element) {
      if (this.isObserver()) {
        this.getObserver()?.observe(element as Element)
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
  private removeEvent (): this {
    if (this.isObserver()) {
      this.getObserver()?.disconnect()
    } else {
      this.getEvent().stop()
    }

    return this
  }
}
