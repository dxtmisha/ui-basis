import { computed, Ref } from 'vue'
import { useRouter } from 'vue-router'

import { EventItem } from '../../classes/EventItem'

import { DesignPropsRefsType, DesignSetupContextType } from '../../classes/Design'
import { UseEnabled } from '../../uses/UseEnabled'

export type ButtonEventType = DesignPropsRefsType & {
  to?: Ref<string>
  value?: Ref<any>
  detail?: Ref<Record<string, any>>
}

export type ButtonEventOptionsType = {
  type: string
  value?: any
  detail?: Record<string, any>
}

export type ButtonDesignEmitsType = {
  click: [
    event: MouseEvent,
    value: ButtonEventOptionsType
  ]
}

/**
 * Base class for working with button events
 *
 * Базовый класс для работы с событиями кнопки
 */
export class ButtonEvent<O extends ButtonDesignEmitsType = ButtonDesignEmitsType> {
  protected readonly enabled: UseEnabled

  /**
   * Constructor
   * @param emit function for calling an event / функция для вызова события
   * @param refs input property / входное свойство
   * @param enabled object of the activity management class / объект класса управления активности
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly emit: DesignSetupContextType<O>['emit'],
    protected readonly refs: ButtonEventType,
    enabled?: UseEnabled
  ) {
    this.enabled = enabled || new UseEnabled(this.refs)
  }

  /**
   * Parameters for the event
   *
   * Параметры для события
   * @protected
   */
  protected readonly options = computed<ButtonEventOptionsType>(() => {
    return {
      type: 'click',
      value: this.refs?.value?.value,
      detail: this.refs?.detail?.value
    }
  })

  /**
   * Events when clicking on the button itself
   *
   * События при клике на самой кнопке
   * @param event press events / события нажатия
   */
  onClick (event: MouseEvent) {
    if (this.enabled.is() && !this.router()) {
      this.emit('click', event, this.options.value)
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
      this.emit('click', event, {
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
    if (this.refs?.to?.value) {
      useRouter().push(this.refs?.to?.value).then()
      return true
    }

    return false
  }
}
