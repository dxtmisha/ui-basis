import { h, VNode } from 'vue'

import {
  Design,
  DesignSetupContextEmitType
} from '../../../classes/Design'
import { ClassesSubClassesType } from '../../../classes/DesignClasses'

import { subClassesConstructor } from './props'

import {
  ConstructorComponentsInterface,
  ConstructorEmitsType,
  ConstructorInitInterface,
  ConstructorPropsValueType,
  ConstructorSlotsType
} from './types'

// [!] System label, cannot be deleted
// [!] Системная метка, нельзя удалять
// :components-import
// :components-import

/**
 * ConstructorDesign
 */
export class ConstructorDesign<
  C extends ClassesSubClassesType = typeof subClassesConstructor,
  P extends ConstructorPropsValueType = ConstructorPropsValueType
> extends Design<
  C,
  HTMLElement,
  P,
  ConstructorInitInterface,
  ConstructorComponentsInterface,
  ConstructorEmitsType,
  ConstructorSlotsType
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
    contextEmit?: DesignSetupContextEmitType<ConstructorEmitsType, ConstructorSlotsType>
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
  protected init (): ConstructorInitInterface {
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
