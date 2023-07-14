import { computed } from 'vue'

import { DesignPropsValueType } from '../classes/Design'

import { PropsProgressType } from '../constructors/Progress/props'

export type UseEnabledPropsType = DesignPropsValueType<{
  progress?: boolean | PropsProgressType
  readonly?: boolean
  disabled?: boolean
}>

/**
 * Class for managing the activity of an element
 *
 * Класс для управления активности элемента
 */
export class UseEnabled {
  /**
   * Constructor
   * @param props input property / входное свойство
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly props: UseEnabledPropsType
  ) {
  }

  readonly item = computed<boolean>(
    () => !this.props?.disabled &&
      !this.props?.readonly &&
      !this.props?.progress
  )

  readonly disabled = computed<boolean | undefined>(() => this.isDisabled() || undefined)

  /**
   * Checking for the status of the element’s activity
   *
   * Проверка на статус активности элемента
   */
  is (): boolean {
    return this.item.value
  }

  /**
   * Checks if the element is turned off
   *
   * Проверяет, выключен ли элемент
   */
  isDisabled (): boolean {
    return !!this.props?.disabled
  }

  /**
   * Checks for read-only status
   *
   * Проверяет на статус только для чтения
   */
  isReadonly (): boolean {
    return !!this.props?.readonly
  }

  /**
   * Checks for the presence of an element for loading
   *
   * Проверяет наличие элемента для загрузки
   */
  isProgress (): boolean {
    return !!this.props?.progress
  }
}
