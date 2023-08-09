import { computed, ComputedRef, PropType, toRefs, VNode } from 'vue'
import { getBind } from '../../functions/render'

import { DesignComponents } from '../../classes/DesignComponents'
import { PropsIconType } from '../Icon/props'
import { ButtonEvent } from './ButtonEvent'

export type ButtonIconComponentsType = {
  icon?: object
}

export type PropsButtonIconType = {
  // Values
  icon?: string | PropsIconType
  iconTrailing?: string | PropsIconType

  // Icon
  iconTurn?: boolean
  iconHide?: boolean

  // Status
  selected?: boolean
}

export const propsButtonIcon = {
  // Values
  icon: [String, Object] as PropType<PropsButtonIconType['icon']>,
  iconTrailing: [String, Object] as PropType<PropsButtonIconType['iconTrailing']>,

  // Icon
  iconTurn: Boolean,
  iconHide: Boolean,

  // Status
  selected: Boolean
}

/**
 * ButtonIcon
 */
export class ButtonIcon {
  readonly iconBind?: ComputedRef<PropsIconType>
  readonly trailingBind?: ComputedRef<PropsIconType>

  /**
   * Constructor
   * @param props input parameter / входной параметр
   * @param components object for working with components / объект для работы с компонентами
   * @param event an object for working with events / объект для работы с событиями
   * @param classes class name for the component / название класса для компонента
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly props: PropsButtonIconType,
    protected readonly components?: DesignComponents<ButtonIconComponentsType, PropsButtonIconType>,
    protected readonly event?: ButtonEvent,
    protected readonly classes?: { icon?: string, trailing?: string }
  ) {
    const refs = toRefs(this.props)

    if ('icon' in this.props) {
      this.iconBind = getBind(refs?.icon, computed(() => ({
        active: this.props?.selected,
        hide: this.props?.iconHide,
        animationType: 'type2',
        start: true
      })), 'icon')
    }

    if ('iconTrailing' in this.props) {
      this.trailingBind = getBind(refs?.iconTrailing, computed(() => ({
        turn: this.props?.iconTurn,
        end: true,
        high: true
      })), 'icon')
    }
  }

  readonly is = computed(() => !!(this.props?.icon || this.props?.iconTrailing))

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  render (): VNode[] {
    const elements: any[] = []

    if (this.components) {
      if (this.iconBind && this.props?.icon) {
        this.components.renderAdd(
          elements,
          'icon',
          {
            class: this.classes?.icon || 'icon',
            ...this.iconBind.value
          }
        )
      }

      if (this.trailingBind && this.props?.iconTrailing) {
        this.components.renderAdd(
          elements,
          'icon',
          {
            class: [this.classes?.trailing || 'trailing', 'is-trailing'],
            ...this.trailingBind.value
          }
        )
      }
    }

    return elements
  }
}
