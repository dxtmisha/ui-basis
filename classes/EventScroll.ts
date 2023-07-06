import { frame } from '../functions/element'

import { ElementRefType } from './ElementItem'
import { EventCallbackType, EventItem } from './EventItem'

/**
 * Maximum waiting time for change
 *
 * Максимальное время ожидания изменения
 */
export const DELAY = 8

/**
 * A class for working with scroll events
 *
 * Класс для работы с событиями scroll
 */
export class EventScroll<R = any> {
  protected event: EventItem
  protected time = 0

  /**
   * Classes Constructor
   *
   * Конструктор
   * @param element element / элемент
   * @param callback the object that receives a notification (an object that implements the
   * Event interface) when an event of the specified type occurs / Объект, который принимает
   * уведомление, когда событие указанного типа произошло
   * @param immediate run the script immediately / запуск скрипта сразу
   * @param delay the number of frames that need to be skipped / число кадров, которые надо пропускать
   */
  constructor (
    element: ElementRefType,
    protected callback = (() => undefined) as EventCallbackType<R>,
    immediate = true,
    protected delay = DELAY
  ) {
    this.event = new EventItem(element, event => this.listener(event))
      .setType(['resize', 'scroll'])

    if (immediate) {
      this.listener()
    }
  }

  /**
   * Returns an object for working with events
   *
   * Возвращает объект для работы с событиями
   */
  getEventItem (): EventItem<R> {
    return this.event
  }

  /**
   * Changes the element for control
   *
   * Изменяет элемент для контроля
   * @param value element / элемент
   */
  setDom (value: ElementRefType): this {
    this.event.setDom(value)
    return this
  }

  /**
   * Modifies the object that receives the notification
   *
   * Модифицирует объект, который получает уведомление
   * @param value
   */
  setCallback (value: EventCallbackType<R>): this {
    this.event.setCallback(value)
    return this
  }

  /**
   * Starting event listening
   *
   * Запуск прослушивания события
   */
  go () {
    this.event.go()
    return this
  }

  /**
   * Stopping event listening
   *
   * Остановка прослушивания события
   */
  stop () {
    this.event.stop()
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
  protected listener (event?: Event): R | void {
    if (this.time < 1) {
      this.time = this.delay

      frame(
        () => this.time--,
        () => this.time > 0,
        () => this.callback(event)
      )
    }
  }
}
