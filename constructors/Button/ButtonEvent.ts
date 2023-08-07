import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { EventItem } from '../../classes/EventItem'

import { ConstrEmitType } from '../../classes/DesignConstructor'

import { UseEnabled } from '../../uses/classes/UseEnabled'

export type ButtonEventType = {
  type: string
  value?: any
  detail?: Record<string, any>
}

export type ButtonEventEmitsType = {
  click: [
    event: MouseEvent,
    value: ButtonEventType
  ]
}

export type PropsButtonEventType = {
  to?: string
  value?: any
  detail?: Record<string, any>
}

export const propsButtonEvent = {
  to: String,
  value: [String, Number, Object],
  detail: [Object]
}

/**
 * Base class for working with button events
 *
 * Базовый класс для работы с событиями кнопки
 */
export class ButtonEvent {
  /**
   * Parameters for the event
   *
   * Параметры для события
   * @protected
   */
  protected readonly options = computed<ButtonEventType>(() => {
    return {
      type: 'click',
      value: this.props?.value,
      detail: this.props?.detail
    }
  })

  /**
   * Constructor
   * @param emits function for calling an event / функция для вызова события
   * @param props input property / входное свойство
   * @param enabled object of the activity management class / объект класса управления активности
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly emits: ConstrEmitType<ButtonEventEmitsType>,
    protected readonly props: PropsButtonEventType,
    protected readonly enabled: UseEnabled
  ) {
  }

  /**
   * Events when clicking on the button itself
   *
   * События при клике на самой кнопке
   * @param event press events / события нажатия
   */
  onClick (event: MouseEvent) {
    if (this.enabled.is() && !this.router()) {
      this.emits('click', event, this.options.value)
    } else {
      EventItem.stopPropagation(event)
    }
  }

  /**
   * Events when clicking on the icon on the right
   *
   * События при нажатии на иконку справа
   * @param event press events / события нажатия
   */
  onTrailing (event: MouseEvent) {
    if (this.enabled.is()) {
      this.emits('click', event, {
        ...this.options.value,
        type: 'trailing'
      })
    } else {
      EventItem.stopPropagation(event)
    }
  }

  /**
   * Changing the link through the router
   *
   * Изменение ссылки через router
   * @protected
   */
  protected router () {
    if (this.props?.to) {
      useRouter().push(this.props?.to).then()
      return true
    }

    return false
  }
}
