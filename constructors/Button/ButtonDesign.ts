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

import { UseEnabled } from '../../uses/classes/UseEnabled'
import { UseLabel } from '../../uses/classes/UseLabel'

import { ButtonEvent } from './ButtonEvent'

// [!] System label, cannot be deleted
// [!] Системная метка, нельзя удалять
// :components-import
// :components-import

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

  protected readonly label: UseLabel

  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :components-variable
  // :components-variable

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

    this.label = new UseLabel(
      this.components,
      this.props,
      this.slots
    )

    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :components-init
    // :components-init
  }

  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): ButtonInitInterface {
    const setup: ButtonInitInterface = {
      isEnabled: this.enabled.item,
      disabledBind: this.enabled.disabledBind,
      onClick: (event: MouseEvent) => this.event.onClick(event)
    }

    return setup
  }

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  protected initRender (): VNode {
    const setup = this.getSetup()
    // const children: any[] = []

    return h('div', {
      ref: this.element,
      class: setup.classes.value.main
    }/* , children */)
  }
}
