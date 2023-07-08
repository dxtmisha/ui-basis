import { computed, ComputedRef, h, SlotsType, VNode } from 'vue'

import {
  Design,
  DesignEmitsType,
  DesignPropsValueType,
  DesignSetupType
} from '../../classes/Design'
import { ClassesSubClassesType } from '../../classes/DesignClasses'
import { AssociativeType } from '../types'

import { propsIcon } from './props'

export interface IconDesignInitInterface {
  isActive: ComputedRef<boolean>
  iconBind: ComputedRef<AssociativeType>
  iconActiveBind: ComputedRef<AssociativeType>
}

export interface IconDesignComponentsInterface {
  image: object
}

export type IconDesignPropsValueType = DesignPropsValueType<typeof propsIcon>
export type IconDesignEmitsType = DesignEmitsType
export type IconDesignSlotsType = SlotsType<{
  default?: () => VNode
}>

/**
 * IconDesign
 */
export class IconDesign<
  C extends ClassesSubClassesType = ClassesSubClassesType,
  P extends IconDesignPropsValueType = IconDesignPropsValueType
> extends Design<
  C,
  HTMLDivElement,
  P,
  IconDesignInitInterface,
  IconDesignComponentsInterface,
  IconDesignEmitsType,
  IconDesignSlotsType
> {
  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): IconDesignInitInterface {
    return {
      isActive: this.isActive,
      iconBind: this.getBind(this.refs.icon, this.imageBind),
      iconActiveBind: this.getBind(this.refs.iconActive, this.imageBind)
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
    const children: any[] = []

    this.initSlot('default', children)

    if (this.components?.image) {
      if (this.props.icon) {
        children.push(h(this.components?.image, setup.iconBind.value))
      }

      if (this.props.iconActive) {
        children.push(h(this.components?.image, setup.iconActiveBind.value))
      }
    }

    return h(
      'div',
      {
        ref: this.element,
        class: setup.classes.value.main
      },
      children
    )
  }

  /**
   * Switch the element to activity mode
   *
   * Переводить элемент в режим активности
   * @protected
   */
  protected readonly isActive = computed<boolean>(() => !!(this.props.iconActive && this.props.active))

  /**
   * Basic input parameters for the image
   *
   * Базовые входные параметры для изображения
   * @protected
   */
  protected readonly imageBind = computed(() => {
    return {
      disabled: this.props.disabled,
      turn: this.props.turn
    }
  })
}
