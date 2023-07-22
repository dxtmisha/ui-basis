import { computed, ComputedRef, VNode } from 'vue'

import { Design, DesignPropsExtendedType, DesignPropsRefsType } from '../../classes/Design'
import { DesignComponents } from '../../classes/DesignComponents'

import {
  ButtonComponentsInterface,
  ButtonPropsValueType
} from './types'
import { DesignClasses } from '../../classes/DesignClasses'

import { PropsIconType } from '../Icon/props'

/**
 * ButtonIcon
 */
export class ButtonIcon<
  C extends ButtonComponentsInterface = ButtonComponentsInterface,
  M extends ButtonPropsValueType = ButtonPropsValueType,
  P extends DesignPropsExtendedType<PropsIconType> = DesignPropsExtendedType<PropsIconType>
> {
  readonly iconBind?: ComputedRef<P>
  readonly trailingBind?: ComputedRef<P>

  /**
   * Constructor
   * @param classes class name for the component / название класса для компонента
   * @param components object for working with components / объект для работы с компонентами
   * @param props input parameter / входной параметр
   * @param refs object for working with components / входной параметр в виде реактивной ссылки
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly classes: DesignClasses,
    protected readonly components: DesignComponents<C>,
    protected readonly props: M,
    protected readonly refs: DesignPropsRefsType<M>
  ) {
    if ('icon' in this.props) {
      this.iconBind = Design.getBindStatic<any, P>(refs?.icon, this.iconOptions, 'icon')
    }

    if ('iconTrailing' in this.props) {
      this.trailingBind = Design.getBindStatic<any, P>(refs?.iconTrailing, this.trailingOptions, 'icon')
    }
  }

  /**
   * Checks if there is a main icon
   *
   * Проверяет, есть ли главная иконка
   */
  readonly isIcon = computed<boolean>(
    () => !!(this.components.is('icon') && this.props?.icon)
  )

  /**
   * Checks if there is an additional icon
   *
   * Проверяет, есть ли дополнительная иконка
   */
  readonly isTrailing = computed<boolean>(
    () => !!(this.components.is('icon') && this.props?.iconTrailing)
  )

  /**
   * Parameters for the main icon
   *
   * Параметры для главной иконки
   */
  readonly iconOptions = computed<P>(() => {
    return {
      active: this.props?.selected,
      hide: this.props?.iconHide,
      animationType: 'type2',
      start: true
    } as P
  })

  /**
   * Parameter for the secondary icon
   *
   * Параметр для вторичной иконки
   */
  readonly trailingOptions = computed<P>(() => {
    return {
      turn: this.props?.iconTurn,
      end: true,
      high: true
    } as P
  })

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  render (): VNode[] {
    const elements: any[] = []

    if (
      this.iconBind &&
      this.isIcon.value
    ) {
      this.components.render(elements, 'icon', {
        class: this.classes.getNameBySubclass(['icon']),
        ...this.iconBind.value
      })
    }

    if (
      this.trailingBind &&
      this.isTrailing.value
    ) {
      this.components.render(elements, 'icon', {
        class: this.classes.getNameBySubclass(['trailing']),
        ...this.trailingBind.value
      })
    }

    return elements
  }
}
