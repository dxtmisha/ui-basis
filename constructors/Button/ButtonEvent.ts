import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { EventItem } from '../../classes/EventItem'

import { DesignSetupContextType } from '../../classes/Design'
import { UseEnabled } from '../../uses/UseEnabled'

import {
  ButtonDesignEmitsType,
  ButtonDesignPropsValueType,
  ButtonEventOptionsType
} from './types'

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
   * @param props input property / входное свойство
   * @param enabled object of the activity management class / объект класса управления активности
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly emit: DesignSetupContextType<O>['emit'],
    protected readonly props: ButtonDesignPropsValueType,
    enabled?: UseEnabled
  ) {
    this.enabled = enabled || new UseEnabled(this.props)
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
      value: this.props?.value,
      detail: this.props?.detail
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
    if (this.props?.to) {
      useRouter().push(this.props?.to).then()
      return true
    }

    return false
  }
}
