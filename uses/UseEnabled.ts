import { computed, Ref } from 'vue'
import { DesignPropsRefsType } from '../classes/Design'

export type UseEnabledType = DesignPropsRefsType & {
  disabled?: Ref<boolean>
  readonly?: Ref<boolean>
  progress?: Ref<boolean>
}

/**
 * Class for managing the activity of an element
 *
 * Класс для управления активности элемента
 */
export class UseEnabled {
  /**
   * Constructor
   * @param refs input property / входное свойство
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly refs: UseEnabledType
  ) {
  }

  readonly item = computed<boolean>(
    () => !this.refs?.disabled?.value &&
      !this.refs?.readonly?.value &&
      !this.refs?.progress?.value
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
    return !!this.refs?.disabled?.value
  }

  /**
   * Checks for read-only status
   *
   * Проверяет на статус только для чтения
   */
  isReadonly (): boolean {
    return !!this.refs?.readonly?.value
  }

  /**
   * Checks for the presence of an element for loading
   *
   * Проверяет наличие элемента для загрузки
   */
  isProgress (): boolean {
    return !!this.refs?.progress?.value
  }
}
