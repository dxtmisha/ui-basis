import { h, onUnmounted, VNode, watch } from 'vue'

import {
  Design,
  DesignSetupContextEmitType
} from '../../classes/Design'

import { Image } from './Image'

import {
  ImageEmitsType,
  ImageInitInterface,
  ImagePropsValueType,
  ImageSlotsType,
  ImageSubClassesType
} from './types'

/**
 * ImageDesign
 */
export class ImageDesign<
  C extends ImageSubClassesType = ImageSubClassesType,
  P extends ImagePropsValueType = ImagePropsValueType
> extends Design<
  C,
  HTMLSpanElement,
  P,
  ImageInitInterface,
  Record<string, any>,
  ImageEmitsType,
  ImageSlotsType
> {
  protected image: Image

  /**
   * Constructor
   * @param props properties / свойства
   * @param contextEmit additional property / дополнительное свойство
   */
  constructor (
    protected readonly props: P,
    contextEmit?: DesignSetupContextEmitType<ImageEmitsType, ImageSlotsType>
  ) {
    super(props, contextEmit)

    this.image = new Image(
      this.element,
      this.classes.getName(),
      this.refs.value,
      this.refs.coordinator,
      this.refs.size,
      this.refs.x,
      this.refs.y,
      this.refs.adaptiveGroup,
      this.refs.adaptive,
      this.refs.adaptiveAlways,
      this.refs.objectWidth,
      this.refs.objectHeight,
      this.refs.url
    )

    this.setExtraMain(this.image.classes)
    this.setExtraStyles(this.image.styles)

    onUnmounted(() => this.image.destructor())

    watch(this.image.getDataImage(), value => this.context.emit('load', value))
  }

  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): ImageInitInterface {
    return {
      text: this.image.text
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

    return h('span', {
      ref: this.element,
      class: setup.classes.value.main,
      style: setup.styles.value,
      translate: 'no'
    }, setup.text.value)
  }
}
