import { computed, h, VNode } from 'vue'

import {
  Design,
  DesignSetupContextEmitType
} from '../../classes/Design'
import { ClassesSubClassesType } from '../../classes/DesignClasses'

import { subClassesIcon } from './props'

import {
  IconComponentsInterface,
  IconEmitsType,
  IconInitInterface,
  IconPropsValueType,
  IconSlotsType
} from './types'

/**
 * IconDesign
 */
export class IconDesign<
  C extends ClassesSubClassesType = typeof subClassesIcon,
  P extends IconPropsValueType = IconPropsValueType
> extends Design<
  C,
  HTMLSpanElement,
  P,
  IconInitInterface,
  IconComponentsInterface,
  IconEmitsType,
  IconSlotsType
> {
  /**
   * Constructor
   * @param props properties / свойства
   * @param contextEmit additional property / дополнительное свойство
   */
  constructor (
    protected readonly props: P,
    contextEmit?: DesignSetupContextEmitType<IconEmitsType, IconSlotsType>
  ) {
    super(props, contextEmit)
  }

  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): IconInitInterface {
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
   * @protected
   */
  protected initRender (): VNode {
    const setup = this.getSetup()
    const children: any[] = []

    this.initSlot('default', children)

    if (this.props.icon) {
      this.components.render(children, 'image', setup.iconBind.value)
    }

    if (this.props.iconActive) {
      this.components.render(children, 'image', setup.iconActiveBind.value)
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
   * Switch the element to activity mode
   *
   * Переводить элемент в режим активности
   * @protected
   */
  protected readonly isActive = computed<boolean>(() => !!(this.props.iconActive && this.props.active))
}
