import { h, onUnmounted, VNode, watch } from 'vue'

import {
  ConstrEmitType,
  ConstrItemType,
  ConstrOptionsInterface,
  DesignConstructor
} from '../../classes/DesignConstructor'

import { Image } from './Image'

import {
  ImageEmitsType,
  ImageExposeInterface,
  ImageSetupInterface
} from './types'
import { PropsImageType, subclassesImage } from './props'

/**
 * ImageDesign
 */
export class ImageDesign<
  SETUP extends ImageSetupInterface,
  EXPOSE extends ImageExposeInterface,
  P extends PropsImageType,
  S extends typeof subclassesImage,
  C extends ConstrItemType
> extends DesignConstructor<
  HTMLSpanElement,
  SETUP,
  ConstrItemType,
  ImageEmitsType,
  EXPOSE,
  P,
  S,
  C
> {
  protected image: Image

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
    emits?: ConstrEmitType<ImageEmitsType>
  ) {
    super(
      name,
      props,
      options,
      emits
    )

    this.image = new Image(
      this.element,
      this.refs.value,
      this.refs?.url,
      this.refs?.size,
      this.refs?.coordinator,
      this.refs?.x,
      this.refs?.y,
      this.refs?.adaptiveGroup,
      this.refs?.adaptive,
      this.refs?.adaptiveAlways,
      this.refs?.objectWidth,
      this.refs?.objectHeight
    )

    this.init()

    onUnmounted(() => this.image.destructor())
    watch(this.image.getDataImage(), value => this.emits?.('load', value))
  }

  /**
   * Initialization of basic options
   *
   * Инициализация базовых опций
   * @protected
   */
  protected initOptions (): ConstrOptionsInterface<P, S, C> {
    return {
      extra: this.image.classes,
      styles: this.image.styles
    }
  }

  /**
   * Initialization of all the necessary properties for work
   *
   * Инициализация всех необходимых свойств для работы
   * @protected
   */
  protected initSetup (): SETUP {
    return {
      text: this.image.text
    } as SETUP
  }

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  protected initRender (): VNode {
    return h('span', {
      ref: this.element,
      class: this.design?.getClasses().main,
      style: this.design?.getStyles(),
      translate: 'no'
    }, this.image.text.value)
  }

  /**
   * List of available external variables
   *
   * Список доступных переменных извне
   */
  expose (): EXPOSE {
    return {
      image: this.image.getDataImage()
    } as EXPOSE
  }
}
