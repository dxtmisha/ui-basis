import { h, VNode } from 'vue'

import {
  ConstrEmitType,
  ConstrItemType,
  ConstrOptionsInterface,
  DesignConstructor
} from '../../classes/DesignConstructor'

import { UseEnabled } from '../../uses/classes/UseEnabled'
import { ButtonEvent } from './ButtonEvent'
import { ButtonLabel } from './ButtonLabel'
import { ButtonIcon } from './ButtonIcon'
import { ButtonProgress } from './ButtonProgress'

import {
  ButtonComponentsType,
  ButtonEmitsType,
  ButtonSetupInterface,
  ButtonSlotsType
} from './types'
import { PropsButtonType, subclassesButton } from './props'

/**
 * ButtonDesign
 */
export class ButtonDesign<
  SETUP extends ButtonSetupInterface,
  EXPOSE extends ConstrItemType,
  P extends PropsButtonType,
  S extends typeof subclassesButton,
  C extends ButtonComponentsType
> extends DesignConstructor<
  HTMLElement,
  SETUP,
  ButtonSlotsType,
  ButtonEmitsType,
  EXPOSE,
  P,
  S,
  C
> {
  protected readonly enabled: UseEnabled
  protected readonly event?: ButtonEvent

  protected readonly label?: ButtonLabel
  protected readonly icon?: ButtonIcon
  protected readonly progress?: ButtonProgress

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
    emits?: ConstrEmitType<ButtonEmitsType>
  ) {
    super(
      name,
      props,
      options,
      emits
    )

    this.enabled = new UseEnabled(this.props)

    if (this.emits) {
      this.event = new ButtonEvent(this.emits, this.props, this.enabled)
    }

    this.init()

    if ('label' in this.props) {
      this.label = new ButtonLabel(
        this.props,
        this.slots,
        this.design?.getClasses().label
      )
    }

    if (
      'icon' in this.props ||
      'iconTrailing' in this.props
    ) {
      this.icon = new ButtonIcon(
        this.props,
        this.components,
        this.event,
        this.design?.getClasses()
      )
    }

    if ('progress' in this.props) {
      this.progress = new ButtonProgress(
        this.props,
        this.components,
        this.design?.getClasses().progress
      )
    }
  }

  /**
   * Initialization of basic options
   *
   * Инициализация базовых опций
   * @protected
   */
  protected initOptions (): ConstrOptionsInterface<P, S, C> {
    const options: ConstrOptionsInterface<P, S, C> = {}

    if (this.icon) {
      options.extra = {
        '??icon': this.icon?.is
      }
    }

    return options
  }

  /**
   * Initialization of all the necessary properties for work
   *
   * Инициализация всех необходимых свойств для работы
   * @protected
   */
  protected initSetup (): SETUP {
    const setup = {
      isEnabled: this.enabled.item,
      disabledBind: this.enabled.disabledBind,
      onClick: (event: MouseEvent) => this.event?.onClick(event)
    } as SETUP

    if (this.label) {
      setup.isLabel = this.label.is
    }

    if (this.icon) {
      if (this.icon.iconBind) {
        setup.iconBind = this.icon.iconBind
      }

      if (this.icon.trailingBind) {
        setup.trailingBind = this.icon.trailingBind
        setup.onTrailing = (event: MouseEvent) => this.event?.onTrailing(event)
      }
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
    const children: any[] = [
      ...(this.progress?.render() || []),
      ...(this.label?.render() || []),
      ...(this.icon?.render() || [])
    ]

    if (this.enabled.is()) {
      this.components?.renderAdd(children, 'ripple')
    }

    return h(this.props?.tag || 'button', {
      ref: this.element,

      class: this.design?.getClasses().main,
      style: this.design?.getStyles(),
      disabled: this.enabled.disabledBind.value,

      onClick: (event: MouseEvent) => this.event?.onClick(event)
    }, children)
  }
}
