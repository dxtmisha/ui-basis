import { ComputedRef, h, onUnmounted, SetupContext, VNode } from 'vue'

import {
  Design,
  DesignPropsValueType,
  DesignSetupType
} from '../../classes/Design'
import { ClassesSubClassesType } from '../../classes/DesignClasses'

import { Image } from './Image'

import { propsImage } from './props'

interface ImageDesignInitInterface {
  text: ComputedRef<string | undefined>
}

type ImageDesignPropsValueType = DesignPropsValueType<typeof propsImage>

/**
 * ImageDesign
 */
export class ImageDesign<
  C extends ClassesSubClassesType = ClassesSubClassesType,
  P extends ImageDesignPropsValueType = ImageDesignPropsValueType
> extends Design<C, HTMLElement, P, ImageDesignInitInterface> {
  protected image?: Image

  /**
   * Constructor
   * @param props properties / свойства
   * @param context additional property / дополнительное свойство
   */
  constructor (
    protected readonly props: P,
    protected readonly context: SetupContext
  ) {
    super(props, context)
  }

  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): ImageDesignInitInterface {
    this.image = new Image(
      this.element,
      this.classes.getName(),
      this.refs.value,
      this.refs.coordinator,
      this.refs.size,
      this.refs.x,
      this.refs.y,
      this.refs.group,
      this.refs.adaptive,
      this.refs.adaptiveAlways,
      this.refs.objectWidth,
      this.refs.objectHeight,
      this.refs.url
    )

    this.setExtraMain(this.image.classes)
    this.setExtraStyles(this.image.styles)

    onUnmounted(() => this.image?.destructor())

    return {
      text: this.image.text
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
    setup: DesignSetupType<C, HTMLDivElement, D, ImageDesignInitInterface>
  ): VNode {
    return h('div', {
      ref: this.element,
      class: setup.classes.value.main,
      style: setup.styles.value,
      translate: 'no'
    }, setup.text.value)
  }
}
