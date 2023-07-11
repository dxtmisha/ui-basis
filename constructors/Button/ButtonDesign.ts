import { ComputedRef, h, VNode } from 'vue'

import {
  Design,
  DesignContextEmitType,
  DesignPropsType,
  DesignPropsValueType,
  DesignSetupType
} from '../../classes/Design'

import { PropsButtonInterface } from './props'

import { ButtonDesignEmitsType, ButtonEvent } from './ButtonEvent'
import { UseEnabled } from '../../uses/UseEnabled'

export interface ButtonDesignComponentsInterface {
  icon?: object
  progress?: object
  ripple?: object
}

export interface ButtonDesignInitInterface {
  isEnabled: ComputedRef<boolean>
  disabledBind: ComputedRef<boolean | undefined>
  onClick: (event: MouseEvent) => void
  onTrailing: (event: MouseEvent) => void
}

export type ButtonDesignSubClassesType = {
  inscription: 'inscription'
}

export type ButtonDesignPropsValueType = DesignPropsValueType<PropsButtonInterface>
export type ButtonDesignSlotsType = DesignPropsType & {
  default?: () => VNode
}

/**
 * ButtonDesign
 */
export class ButtonDesign<
  C extends ButtonDesignSubClassesType = ButtonDesignSubClassesType,
  P extends ButtonDesignPropsValueType = ButtonDesignPropsValueType
> extends Design<
  C,
  HTMLElement,
  P,
  ButtonDesignInitInterface,
  ButtonDesignComponentsInterface,
  ButtonDesignEmitsType,
  ButtonDesignSlotsType
> {
  protected readonly enabled: UseEnabled

  protected readonly event: ButtonEvent

  /**
   * Constructor
   * @param props properties / свойства
   * @param contextEmit additional property / дополнительное свойство
   */
  constructor (
    protected readonly props: P,
    contextEmit?: DesignContextEmitType<ButtonDesignEmitsType, ButtonDesignSlotsType>
  ) {
    super(props, contextEmit)

    this.enabled = new UseEnabled(this.refs)
    this.event = new ButtonEvent(this.context.emit, this.refs, this.enabled)
  }

  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): ButtonDesignInitInterface {
    return {
      isEnabled: this.enabled.item,
      disabledBind: this.enabled.disabled,
      onClick: (event: MouseEvent) => this.event.onClick(event),
      onTrailing: (event: MouseEvent) => this.event.onTrailing(event)
    }
  }

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @param setup the result of executing the setup method / результат выполнения метода настройки
   * @protected
   */
  protected initRender<D = Record<string, any>> (
    setup: DesignSetupType<C, HTMLDivElement, D, ButtonDesignInitInterface>
  ): VNode {
    const children: any[] = []

    if (this.props.inscription) {
      children.push(h('span', { class: setup.classes.value.inscription }, this.props.inscription))
    }

    this.initSlot('default', children)

    if (this.components?.ripple && setup.isEnabled.value) {
      children.push(h(this.components?.ripple))
    }

    return h(this.refs.tag.value, {
      ref: this.element,

      class: setup.classes.value.main,
      style: setup.styles.value,
      disabled: setup.disabledBind.value,

      onClick: setup.onClick
    }, children)
  }
}
