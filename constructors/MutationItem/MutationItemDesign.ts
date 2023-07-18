import { h, VNode } from 'vue'

import {
  Design,
  DesignSetupContextEmitType
} from '../../classes/Design'
import { ClassesSubClassesType } from '../../classes/DesignClasses'

import { subClassesMutationItem } from './props'

import {
  MutationItemEmitsType,
  MutationItemInitInterface,
  MutationItemPropsValueType,
  MutationItemSlotsType
} from './types'

// [!] System label, cannot be deleted
// [!] Системная метка, нельзя удалять
// :components-import
// :components-import

/**
 * MutationItemDesign
 */
export class MutationItemDesign<
  C extends ClassesSubClassesType = typeof subClassesMutationItem,
  P extends MutationItemPropsValueType = MutationItemPropsValueType
> extends Design<
  C,
  HTMLElement,
  P,
  MutationItemInitInterface,
  Record<string, any>,
  MutationItemEmitsType,
  MutationItemSlotsType
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
    contextEmit?: DesignSetupContextEmitType<MutationItemEmitsType, MutationItemSlotsType>
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
  protected init (): MutationItemInitInterface {
    return {
      tag: 'div',
      binds: {}
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
