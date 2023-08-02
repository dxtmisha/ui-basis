import { h, SetupContext, VNode } from 'vue'

import { ConstructorOptionsInterface, DesignConstructor } from '../../../classes/DesignConstructor'

import {
  ConstructorComponentsInterface,
  ConstructorEmitsType,
  ConstructorExposeType,
  ConstructorSetupInterface,
  ConstructorSlotsType
} from './types'
import { PropsConstructorFullType, subclassesConstructor } from './props'

/**
 * ConstructorDesign
 */
export class ConstructorDesign<
  SETUP extends ConstructorSetupInterface,
  EXPOSE extends ConstructorExposeType,
  P extends PropsConstructorFullType,
  S extends typeof subclassesConstructor,
  C extends ConstructorComponentsInterface
> extends DesignConstructor<
  HTMLElement,
  SETUP,
  ConstructorSlotsType,
  ConstructorEmitsType,
  EXPOSE,
  P,
  S,
  C
> {
  /**
   * Constructor
   * @param name class name / название класса
   * @param props properties / свойства
   * @param options list of additional parameters / список дополнительных параметров
   * @param emits function for calling an event / функция для вызова события
   */
  constructor (
    name: string,
    props: Required<P>,
    options?: ConstructorOptionsInterface<P, S, C>,
    emits?: SetupContext['emit']
  ) {
    super(
      name,
      props,
      options,
      emits
    )

    // Initialization

    this.init()
  }

  /**
   * Initialization of basic options
   *
   * Инициализация базовых опций
   * @protected
   */
  protected initOptions (): ConstructorOptionsInterface<P, S, C> {
    return {}
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
      class: this.design?.getClasses().main
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
