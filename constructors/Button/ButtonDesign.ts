import { h, VNode } from 'vue'

import { DesignConstructor } from '../../classes/DesignConstructor'
import { ClassesSubType } from '../../classes/DesignClasses'

import {
  ButtonComponentsInterface,
  ButtonEmitsType,
  ButtonExposeType,
  ButtonSetupInterface,
  ButtonSlotsType
} from './types'
import { PropsButtonType, subclassesButton } from './props'

/**
 * ButtonDesign
 */
export class ButtonDesign<
  SETUP extends ButtonSetupInterface,
  EXPOSE extends ButtonExposeType,
  P extends PropsButtonType,
  S extends ClassesSubType = typeof subclassesButton
> extends DesignConstructor<
  HTMLElement,
  SETUP,
  ButtonSlotsType,
  ButtonEmitsType,
  EXPOSE,
  P,
  S,
  ButtonComponentsInterface
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
