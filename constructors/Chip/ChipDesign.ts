import { h, VNode } from 'vue'

import {
  Design,
  DesignSetupContextEmitType
} from '../../classes/Design'
import { ClassesSubClassesType } from '../../classes/DesignClasses'

import { subClassesChip } from './props'

import {
  ChipComponentsInterface,
  ChipEmitsType,
  ChipInitInterface,
  ChipPropsValueType,
  ChipSlotsType
} from './types'

// [!] System label, cannot be deleted
// [!] Системная метка, нельзя удалять
// :components-import
// :components-import

/**
 * ChipDesign
 */
export class ChipDesign<
  C extends ClassesSubClassesType = typeof subClassesChip,
  P extends ChipPropsValueType = ChipPropsValueType
> extends Design<
  C,
  HTMLElement,
  P,
  ChipInitInterface,
  ChipComponentsInterface,
  ChipEmitsType,
  ChipSlotsType
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
    contextEmit?: DesignSetupContextEmitType<ChipEmitsType, ChipSlotsType>
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
  protected init (): ChipInitInterface {
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
