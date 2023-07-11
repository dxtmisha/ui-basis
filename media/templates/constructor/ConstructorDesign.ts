import { h, VNode } from 'vue'

import {
  Design,
  DesignContextEmitType,
  DesignEmitsType,
  DesignPropsType,
  DesignPropsValueType,
  DesignSetupType
} from '../../../classes/Design'
import { ClassesSubClassesType } from '../../../classes/DesignClasses'

import { PropsConstructorInterface } from './props'

export interface ConstructorDesignComponentsInterface {
  component: object
}

export interface ConstructorDesignInitInterface {
  property: string
}

export type ConstructorDesignSubClassesType = ClassesSubClassesType

export type ConstructorDesignPropsValueType = DesignPropsValueType<PropsConstructorInterface>
export type ConstructorDesignEmitsType = DesignEmitsType
export type ConstructorDesignSlotsType = DesignPropsType & {
  default?: () => VNode
}

/**
 * ConstructorDesign
 */
export class ConstructorDesign<
  C extends ConstructorDesignSubClassesType = ConstructorDesignSubClassesType,
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
   * Constructor
   * @param props properties / свойства
   * @param contextEmit additional property / дополнительное свойство
   */
  constructor (
    protected readonly props: P,
    contextEmit?: DesignContextEmitType<ConstructorDesignEmitsType, ConstructorDesignSlotsType>
  ) {
    super(props, contextEmit)
  }

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
    // const children: any[] = []

    return h('div', {
      ref: this.element,
      class: setup.classes.value.main
    })
  }
}
