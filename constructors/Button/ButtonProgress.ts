import { ComputedRef, VNode } from 'vue'

import { Design, DesignPropsRefsType } from '../../classes/Design'
import { DesignComponents } from '../../classes/DesignComponents'

import {
  ButtonComponentsInterface,
  ButtonPropsValueType
} from './types'

import { PropsProgressType } from '../Progress/props'

export class ButtonProgress<
  P extends PropsProgressType
> {
  readonly bind: ComputedRef<P>

  constructor (
    protected readonly components: DesignComponents<ButtonComponentsInterface>,
    protected readonly props: ButtonPropsValueType,
    protected readonly refs: DesignPropsRefsType<ButtonPropsValueType>
  ) {
    this.bind = Design.getBindStatic<any, P>(refs.progress, this.options, 'visible')
  }

  readonly options: P = {
    circular: true
  } as P

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  render (): VNode {
    const item: any[] = []

    if (this.props.icon) {
      this.components.render(children, 'icon', this.iconBind.value)
    }

    if (this.props.iconTrailing) {
      this.components.render(children, 'icon', this.trailingBind.value)
    }

    return children
  }
}
