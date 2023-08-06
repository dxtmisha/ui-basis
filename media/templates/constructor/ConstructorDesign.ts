import { h, VNode } from 'vue'

import { ConstrEmitType, ConstrOptionsInterface, DesignConstructor } from '../../../classes/DesignConstructor'

import {
  ConstructorComponentsInterface,
  ConstructorEmitsType,
  ConstructorExposeInterface,
  ConstructorSetupInterface,
  ConstructorSlotsType
} from './types'
import { PropsConstructorType, subclassesConstructor } from './props'

/**
 * ConstructorDesign
 */
export class ConstructorDesign<
  SETUP extends ConstructorSetupInterface,
  EXPOSE extends ConstructorExposeInterface,
  P extends PropsConstructorType,
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
    props: Readonly<P>,
    options?: ConstrOptionsInterface<P, S, C>,
    emits?: ConstrEmitType<ConstructorEmitsType>
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
  protected initOptions (): ConstrOptionsInterface<P, S, C> {
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
