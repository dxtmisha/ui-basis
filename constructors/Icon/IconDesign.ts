import { computed, ComputedRef, h, VNode } from 'vue'
import { getBind } from '../../functions/render'

import {
  ConstrEmitType,
  ConstrItemType,
  ConstrOptionsInterface,
  DesignConstructor
} from '../../classes/DesignConstructor'

import { ImageDataType } from '../Image/ImageData'

import {
  IconComponentsInterface,
  IconEmitsType,
  IconSetupInterface,
  IconSlotsType
} from './types'
import { PropsIconFullType, subclassesIcon } from './props'

/**
 * IconDesign
 */
export class IconDesign<
  SETUP extends IconSetupInterface,
  EXPOSE extends ConstrItemType,
  P extends PropsIconFullType,
  S extends typeof subclassesIcon,
  C extends IconComponentsInterface
> extends DesignConstructor<
  HTMLSpanElement,
  SETUP,
  IconSlotsType,
  IconEmitsType,
  EXPOSE,
  P,
  S,
  C
> {
  /**
   * Switch the element to activity mode
   *
   * Переводить элемент в режим активности
   * @protected
   */
  protected readonly isActive = computed<boolean>(() => !!(this.props?.iconActive && this.props?.active))

  /**
   * Basic input parameters for the image
   *
   * Базовые входные параметры для изображения
   * @protected
   */
  protected readonly imageBind = computed(() => {
    return {
      disabled: this.props?.disabled,
      turn: this.props?.turn,
      onLoad: (image: ImageDataType) => this.emits?.('load', image)
    }
  })

  /**
   * Basic input data for the first image
   *
   * Базовые входные данные для первого изображения
   * @protected
   */
  protected readonly iconBind: ComputedRef<ConstrItemType>

  /**
   * Basic input data for the active icon
   *
   * Базовые входные данные для активной иконки
   * @protected
   */
  protected readonly iconActiveBind?: ComputedRef<ConstrItemType>

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
    options?: ConstrOptionsInterface<P, S, C>,
    emits?: ConstrEmitType<IconEmitsType>
  ) {
    super(
      name,
      props,
      options,
      emits
    )

    this.init()

    this.iconBind = getBind(this.refs?.icon, computed(() => ({
      class: this.design?.getClassesBySubclass(['icon']),
      ...this.imageBind.value,
      hide: this.isActive.value
    })))

    if ('iconActive' in this.props) {
      this.iconActiveBind = getBind(this.refs?.iconActive, computed(() => ({
        class: this.design?.getClassesBySubclass(['active']),
        ...this.imageBind.value,
        hide: !this.isActive.value
      })))
    }
  }

  /**
   * Initialization of all the necessary properties for work
   *
   * Инициализация всех необходимых свойств для работы
   * @protected
   */
  protected initSetup (): SETUP {
    const setup = { iconBind: this.iconBind } as SETUP

    if (this.iconActiveBind) {
      setup.isActive = this.isActive
      setup.iconActiveBind = this.iconActiveBind
    }

    return setup
  }

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  protected initRender (): VNode {
    const children: any[] = []

    this.initSlot('default', children)

    if (this.components?.is('image')) {
      if (this.props?.icon) {
        this.components?.renderAdd(children, 'image', this.iconBind.value)
      }

      if (this.props?.iconActive) {
        this.components?.renderAdd(children, 'image', this.iconActiveBind?.value)
      }
    }

    return h('span', {
      ref: this.element,
      class: this.design?.getClasses().main
    }, children)
  }
}
