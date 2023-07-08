import { EmitsOptions, h, SlotsType, VNode } from 'vue'

import {
  Design,
  DesignPropsValueType,
  DesignSetupType
} from '../../../classes/Design'
import { ClassesSubClassesType } from '../../../classes/DesignClasses'

import { propsConstructor } from './props'

export interface ConstructorDesignInitInterface {
  property: string
}

export interface ConstructorDesignComponentsInterface {
  component: object
}

export type ConstructorDesignPropsValueType = DesignPropsValueType<typeof propsConstructor>
export type ConstructorDesignEmitsType = EmitsOptions
export type ConstructorDesignSlotsType = SlotsType<{
  default?: () => VNode
}>

/**
 * ConstructorDesign
 */
export class ConstructorDesign<
  C extends ClassesSubClassesType = ClassesSubClassesType,
  P extends ConstructorDesignPropsValueType = ConstructorDesignPropsValueType
> extends Design<
  C,
  HTMLElement,
  P,
  ConstructorDesignInitInterface,
  ConstructorDesignComponentsInterface,
  ConstructorDesignEmitsType,
  ConstructorDesignSlotsType
> {
  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): ConstructorDesignInitInterface {
    return {
      property: 'constructor'
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
    setup: DesignSetupType<C, HTMLDivElement, D, ConstructorDesignInitInterface>
  ): VNode {
    return h('div', {
      ref: this.element,
      class: setup.classes.value.main
    })
  }
}
