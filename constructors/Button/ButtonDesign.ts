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
    return {
      property: 'constructor'
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
    // const children: any[] = []

    return h('div', {
      ref: this.element,
      class: setup.classes.value.main
    }/* , children */)
  }
}
