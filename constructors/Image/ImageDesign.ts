import { h, VNode } from 'vue'

import {
  Design,
  DesignPropsValueType,
  DesignSetupType
} from '../../classes/Design'
import { ClassesSubClassesType } from '../../classes/DesignClasses'

import { propsImage } from './props'

interface ImageDesignInitInterface {
  property: string
}

type ImageDesignPropsValueType = DesignPropsValueType<typeof propsImage>

/**
 * ImageDesign
 */
export class ImageDesign<
  C extends ClassesSubClassesType = ClassesSubClassesType,
  P extends ImageDesignPropsValueType = ImageDesignPropsValueType
> extends Design<C, HTMLElement, P, ImageDesignInitInterface> {
  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): ImageDesignInitInterface {
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
    setup: DesignSetupType<C, HTMLDivElement, D, ImageDesignInitInterface>
  ): VNode {
    return h('div', {
      ref: this.element,
      class: setup.classes.value.main
    })
  }
}
