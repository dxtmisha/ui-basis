import { h, VNode } from 'vue'

import {
  Design,
  DesignSetupContextEmitType
} from '../../../classes/Design'

import {
  ConstructorComponentsInterface,
  ConstructorEmitsType,
  ConstructorInitInterface,
  ConstructorPropsValueType,
  ConstructorSlotsType,
  ConstructorSubClassesType
} from './types'

/**
 * ConstructorDesign
 */
export class ConstructorDesign<
  C extends ConstructorSubClassesType = ConstructorSubClassesType,
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
