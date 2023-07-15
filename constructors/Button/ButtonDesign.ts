import { h, VNode } from 'vue'

import {
  Design,
  DesignSetupContextEmitType
} from '../../classes/Design'
import { ClassesSubClassesType } from '../../classes/DesignClasses'

import { subClassesButton } from './props'

import {
  ButtonComponentsInterface,
  ButtonEmitsType,
  ButtonInitInterface,
  ButtonPropsValueType,
  ButtonSlotsType
} from './types'

import { UseEnabled } from '../../uses/UseEnabled'

import { ButtonEvent } from './ButtonEvent'
import { ButtonInscription } from './ButtonInscription'
import { ButtonIcon } from './ButtonIcon'

/**
 * ButtonDesign
 */
export class ButtonDesign<
  C extends ClassesSubClassesType = typeof subClassesButton,
  P extends ButtonPropsValueType = ButtonPropsValueType
> extends Design<
  C,
  HTMLElement,
  P,
  ButtonInitInterface,
  ButtonComponentsInterface,
  ButtonEmitsType,
  ButtonSlotsType
> {
  protected readonly enabled: UseEnabled

  protected readonly event: ButtonEvent
  protected readonly inscription: ButtonInscription
  protected readonly icon: ButtonIcon

  /**
   * Constructor
   * @param props properties / свойства
   * @param contextEmit additional property / дополнительное свойство
   */
  constructor (
    protected readonly props: P,
    contextEmit?: DesignSetupContextEmitType<ButtonEmitsType, ButtonSlotsType>
  ) {
    super(props, contextEmit)

    this.enabled = new UseEnabled(this.props)

    this.event = new ButtonEvent(this.emit, this.props, this.enabled)
    this.inscription = new ButtonInscription(this.slots, this.props)

    this.icon = new ButtonIcon(
      this.components,
      this.props,
      this.refs
    )

    this.classes.setExtraState({
      inscription: this.inscription.isInscription,
      icon: this.icon.isIcon,
      trailing: this.icon.isTrailing
    })
  }

  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): ButtonInitInterface {
    return {
      isEnabled: this.enabled.item,
      isInscription: this.inscription.isInscription,

      disabledBind: this.enabled.disabled,
      iconBind: this.icon.iconBind,
      trailingBind: this.icon.trailingBind,

      onClick: (event: MouseEvent) => this.event.onClick(event),
      onTrailing: (event: MouseEvent) => this.event.onTrailing(event)
    }
  }

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  protected initRender (): VNode {
    const setup = this.getSetup()
    const children: any[] = [
      ...this.icon.render(),
      ...this.inscription.render(setup.classes.value.inscription)
    ]

    if (setup.isEnabled.value) {
      this.components.render(children, 'ripple')
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
