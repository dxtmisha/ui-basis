import { computed, ComputedRef, VNode } from 'vue'

import { Design, DesignPropsExtendedType, DesignPropsRefsType } from '../../classes/Design'
import { DesignComponents } from '../../classes/DesignComponents'

import {
  ButtonComponentsInterface,
  ButtonPropsValueType
} from './types'

import { PropsProgressType } from '../Progress/props'

/**
 * ButtonProgress
 */
export class ButtonProgress<
  P extends DesignPropsExtendedType<PropsProgressType> = DesignPropsExtendedType<PropsProgressType>,
  M extends ButtonPropsValueType = ButtonPropsValueType,
  C extends ButtonComponentsInterface = ButtonComponentsInterface
> {
  readonly bind: ComputedRef<P>

  /**
   * Constructor
   * @param components object for working with components / объект для работы с компонентами
   * @param props input parameter / входной параметр
   * @param refs object for working with components / входной параметр в виде реактивной ссылки
   */
  constructor (
    protected readonly components: DesignComponents<C>,
    protected readonly props: M,
    protected readonly refs: DesignPropsRefsType<M>
  ) {
    this.bind = Design.getBindStatic<any, P>(refs.progress, this.options, 'visible')
  }

  /**
   * Checks if the element is active
   *
   * Проверяет, активен ли элемент
   */
  readonly is = computed<boolean>(
    () => !!(this.components.is('progress') && this.props.progress)
  )

  /**
   * Basic parameters
   *
   * Базовые параметры
   */
  readonly options: P = {
    circular: true,
    inverse: true
  } as P

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  render (): VNode[] {
    const elements: any[] = []

    if (this.is.value) {
      this.components.render(elements, 'progress', this.bind.value)
    }

    return elements
  }
}
