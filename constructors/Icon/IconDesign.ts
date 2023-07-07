import { h, VNode } from 'vue'

import {
  Design,
  DesignPropsValueType,
  DesignSetupType
} from '../../classes/Design'
import { ClassesSubClassesType } from '../../classes/DesignClasses'

import { propsIcon } from './props'

interface IconDesignInitInterface {
  property: string
}

type IconDesignPropsValueType = DesignPropsValueType<typeof propsIcon>

/**
 * IconDesign
 */
export class IconDesign<
  C extends ClassesSubClassesType = ClassesSubClassesType,
  P extends IconDesignPropsValueType = IconDesignPropsValueType
> extends Design<C, HTMLElement, P, IconDesignInitInterface> {
  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): IconDesignInitInterface {
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
    setup: DesignSetupType<C, HTMLDivElement, D, IconDesignInitInterface>
  ): VNode {
    return h('div', {
      ref: this.element,
      class: setup.classes.value.main
    })
  }
}
