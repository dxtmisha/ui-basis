import { h, VNode } from 'vue'

import { DesignConstructor } from '../../../classes/DesignConstructor'
import { ClassesSubType } from '../../../classes/DesignClasses'

import {
  ConstructorComponentsInterface,
  ConstructorEmitsType,
  ConstructorExposeType,
  ConstructorSetupInterface,
  ConstructorSlotsType
} from './types'
import { PropsConstructorType, subclassesConstructor } from './props'

/**
 * ConstructorDesign
 */
export class ConstructorDesign<
  SETUP extends ConstructorSetupInterface,
  EXPOSE extends ConstructorExposeType,
  P extends PropsConstructorType,
  S extends ClassesSubType = typeof subclassesConstructor
> extends DesignConstructor<
  HTMLElement,
  SETUP,
  ConstructorSlotsType,
  ConstructorEmitsType,
  EXPOSE,
  P,
  S,
  ConstructorComponentsInterface
> {
  /**
   * Initialization of basic parameters
   *
   * Инициализация базовых параметров
   * @protected
   */
  protected init () {
    // Initialization
  }

  /**
   * Initialization of all the necessary properties for work
   *
   * Инициализация всех необходимых свойств для работы
   * @protected
   */
  protected initSetup (): SETUP {
    return {} as SETUP
  }

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  protected initRender (): VNode {
    // const children: any[] = []

    return h('div', {
      ref: this.element,
      class: this.design?.getClasses().value.main
    }/* , children */)
  }

  /**
   * List of available external variables
   *
   * Список доступных переменных извне
   */
  expose (): EXPOSE {
    return {} as EXPOSE
  }
}
