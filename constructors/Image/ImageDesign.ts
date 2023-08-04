import { h, SetupContext, VNode } from 'vue'

import { ImageOptionsInterface, DesignConstructor } from '../../classes/DesignConstructor'

import {
  ImageComponentsInterface,
  ImageEmitsType,
  ImageExposeType,
  ImageSetupInterface,
  ImageSlotsType
} from './types'
import { PropsImageFullType, subclassesImage } from './props'

/**
 * ImageDesign
 */
export class ImageDesign<
  SETUP extends ImageSetupInterface,
  EXPOSE extends ImageExposeType,
  P extends PropsImageFullType,
  S extends typeof subclassesImage,
  C extends ImageComponentsInterface
> extends DesignConstructor<
  HTMLElement,
  SETUP,
  ImageSlotsType,
  ImageEmitsType,
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
    options?: ImageOptionsInterface<P, S, C>,
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
  protected initOptions (): ImageOptionsInterface<P, S, C> {
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
