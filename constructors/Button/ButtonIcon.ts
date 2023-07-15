import { computed, ComputedRef, VNode } from 'vue'

import { Design, DesignPropsRefsType } from '../../classes/Design'
import { DesignComponents } from '../../classes/DesignComponents'

import { ButtonComponentsInterface, ButtonPropsValueType } from './types'
import { PropsIconType } from '../Icon/props'

/**
 * Class for rendering icon on the button
 *
 * Класс для рендеринга иконки у кнопки
 */
export class ButtonIcon<
  I extends PropsIconType = PropsIconType
> {
  readonly iconBind: ComputedRef<I>
  readonly trailingBind: ComputedRef<I>

  /**
   * Constructor
   * @param components object for working with components / объект для работы с компонентами
   * @param props input parameter / входной параметр
   * @param refs object for working with components / входной параметр в виде реактивной ссылки
   */
  constructor (
    protected readonly components: DesignComponents<ButtonComponentsInterface>,
    protected readonly props: ButtonPropsValueType,
    protected readonly refs: DesignPropsRefsType<ButtonPropsValueType>
  ) {
    this.iconBind = Design.getBindStatic<any, I>(refs.icon, this.optionsIcon, 'icon')
    this.trailingBind = Design.getBindStatic<any | undefined, I>(refs.iconTrailing, this.optionsTrailing, 'icon')
  }

  /**
   * Checks if there is a main icon
   *
   * Проверяет, есть ли главная иконка
   */
  readonly isIcon = computed<boolean>(
    () => !!(this.components.is('icon') && this.props.icon)
  )

  /**
   * Checks if there is an additional icon
   *
   * Проверяет, есть ли дополнительная иконка
   */
  readonly isTrailing = computed<boolean>(
    () => !!(this.components.is('icon') && this.props.iconTrailing)
  )

  /**
   * Parameters for the main icon
   *
   * Параметры для главной иконки
   */
  readonly optionsIcon = computed<I>(() => {
    return {
      active: this.props?.selected || false,
      hide: this.props?.iconHide || false,
      animationType: 'type2'
    } as I
  })

  /**
   * Parameter for the secondary icon
   *
   * Параметр для вторичной иконки
   */
  readonly optionsTrailing = computed<I>(() => {
    return {
      turn: this.props?.iconTurn || false,
      end: true,
      high: true
    } as I
  })

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  render (): VNode[] {
    const elements: any[] = []

    if (this.isIcon.value) {
      this.components.render(elements, 'icon', this.iconBind.value)
    }

    if (this.isTrailing.value) {
      this.components.render(elements, 'icon', this.trailingBind.value)
    }

    return elements
  }
}
