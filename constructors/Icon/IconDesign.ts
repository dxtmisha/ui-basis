import { computed, ComputedRef, h, VNode } from 'vue'

import {
  Design,
  DesignPropsType,
  DesignPropsValueType,
  DesignSetupType
} from '../../classes/Design'
import { ClassesSubClassesType } from '../../classes/DesignClasses'

import { PropsIconInterface } from './props'

export interface IconDesignInitInterface {
  isActive: ComputedRef<boolean>
  iconBind: ComputedRef<Record<string, any>>
  iconActiveBind: ComputedRef<Record<string, any>>
}

export interface IconDesignComponentsInterface {
  image: object
}

export type IconDesignPropsValueType = DesignPropsValueType<PropsIconInterface>
export type IconDesignEmitsType = {
  load: [value: any]
}
export type IconDesignSlotsType = DesignPropsType & {
  default (): any
}

/**
 * IconDesign
 */
export class IconDesign<
  C extends ClassesSubClassesType = ClassesSubClassesType,
  P extends IconDesignPropsValueType = IconDesignPropsValueType
> extends Design<
  C,
  HTMLSpanElement,
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
      iconBind: this.getBind(this.refs.icon, this.iconBind),
      iconActiveBind: this.getBind(this.refs.iconActive, this.iconActiveBind)
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
      'span',
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
      turn: this.props.turn,
      onLoad: (value: any) => this.context.emit('load', value)
    }
  })

  /**
   * Basic input data for the first image
   *
   * Базовые входные данные для первого изображения
   * @protected
   */
  protected readonly iconBind = computed(() => {
    return {
      ...this.imageBind.value,
      hide: this.isActive.value
    }
  })

  /**
   * Basic input data for the active icon
   *
   * Базовые входные данные для активной иконки
   * @protected
   */
  protected readonly iconActiveBind = computed(() => {
    return {
      ...this.imageBind.value,
      hide: !this.isActive.value
    }
  })
}
