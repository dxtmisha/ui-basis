import { computed } from 'vue'
import { PropsProgressFullType } from './props'

export class ProgressValue<
  P extends PropsProgressFullType
> {
  /**
   * Checks if a specific value has been passed
   *
   * Проверяет, передано ли конкретное значение
   * @protected
   */
  public readonly isValue = computed<boolean>(() => {
    return typeof this.props?.value === 'number'
  })

  /**
   * Values are converted to percentages
   *
   * Значения преобразованы в проценты
   * @protected
   */
  public readonly valueInPercent = computed<string | null>(() => {
    if (typeof this.props?.value === 'number') {
      return this.props?.circular
        ? `${(100 / (this.props?.max || 100) * this.props.value)}`
        : `${100 - (100 / (this.props?.max || 100) * this.props.value)}%`
    } else {
      return null
    }
  })

  /**
   * Constructor
   * @param props properties / свойства
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly props: Required<P>
  ) {
  }
}
