import { ComputedRef, h, onUnmounted, SlotsType, VNode } from 'vue'

import {
  Design,
  DesignEmitsType,
  DesignPropsValueType,
  DesignSetupType
} from '../../classes/Design'
import { ClassesSubClassesType } from '../../classes/DesignClasses'
import { AssociativeType } from '../types'

import { Image } from './Image'

import { propsImage } from './props'

export interface ImageDesignInitInterface {
  text: ComputedRef<string | undefined>
}

export type ImageDesignPropsValueType = DesignPropsValueType<typeof propsImage>
export type ImageDesignEmitsType = DesignEmitsType
export type ImageDesignSlotsType = SlotsType

/**
 * ImageDesign
 */
export class ImageDesign<
  C extends ClassesSubClassesType = ClassesSubClassesType,
  P extends ImageDesignPropsValueType = ImageDesignPropsValueType
> extends Design<
  C,
  HTMLSpanElement,
  P,
  ImageDesignInitInterface,
  AssociativeType,
  ImageDesignEmitsType,
  ImageDesignSlotsType
> {
  protected image?: Image

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
      this.refs.adaptiveGroup,
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
    return h('span', {
      ref: this.element,
      class: setup.classes.value.main,
      style: setup.styles.value,
      translate: 'no'
    }, setup.text.value)
  }
}
