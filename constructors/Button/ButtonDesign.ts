import { ComputedRef, h, VNode } from 'vue'

import {
  Design,
  DesignContextEmitType,
  DesignSetupType
} from '../../classes/Design'

import { UseEnabled } from '../../uses/UseEnabled'
import { ButtonEvent } from './ButtonEvent'

import {
  ButtonDesignEmitsType,
  ButtonDesignPropsValueType,
  ButtonDesignSlotsType,
  ButtonDesignSubClassesType
} from './types'
import { ButtonInscription } from './ButtonInscription'

export interface ButtonDesignComponentsInterface {
  icon?: object
  progress?: object
  ripple?: object
}

export interface ButtonDesignInitInterface {
  isEnabled: ComputedRef<boolean>
  isInscription: ComputedRef<boolean>

  disabledBind: ComputedRef<boolean | undefined>

  onClick: (event: MouseEvent) => void
  onTrailing: (event: MouseEvent) => void
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
  protected readonly inscription: ButtonInscription

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

    this.enabled = new UseEnabled(this.props)
    this.event = new ButtonEvent(this.context.emit, this.props, this.enabled)
    this.inscription = new ButtonInscription(this.context.slots, this.props)
  }

  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): ButtonDesignInitInterface {
    this.classes.setExtraMain({
      [this.classes.getNameByState(['inscription'])]: this.inscription.isInscription
    })

    return {
      isEnabled: this.enabled.item,
      isInscription: this.inscription.isInscription,

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

    if (setup.isInscription.value) {
      children.push(
        this.inscription.render(setup.classes.value.inscription)
      )
    }

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
