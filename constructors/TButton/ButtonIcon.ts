import { computed, ComputedRef, h, toRef, toRefs } from 'vue'

import { Design } from '../../classes/Design'

import { PropsIconInterface } from '../Icon/props'

import {
  ButtonDesignComponentsInterface,
  ButtonDesignPropsValueType
} from './types'

export class ButtonIcon {
  readonly iconBind?: ComputedRef<PropsIconInterface>
  readonly trailingBind: ComputedRef<PropsIconInterface>

  constructor (
    protected readonly props: ButtonDesignPropsValueType,
    protected readonly components?: ButtonDesignComponentsInterface
  ) {
    const {
      icon,
      iconTrailing
    } = toRefs(this.props)

    if (icon.value) {
      this.iconBind = Design.getBindStatic<any, PropsIconInterface>(icon, this.optionsIcon, 'icon')
    }
    this.trailingBind = Design.getBindStatic<any | undefined, PropsIconInterface>(iconTrailing, this.optionsTrailing, 'icon')
  }

  readonly isIcon = computed<boolean>(() => !!this.props.icon)
  readonly isTrailing = computed<boolean>(() => !!this.props.iconTrailing)

  readonly optionsIcon = computed<PropsIconInterface>(() => {
    return {
      active: this.props?.selected,
      hide: this.props?.iconHide,
      animationType: 'type2'
    }
  })

  readonly optionsTrailing = computed<PropsIconInterface>(() => {
    return {
      turn: this.props?.iconTurn,
      end: true
    }
  })

  render () {
    const children: any[] = []
    console.log('this.props.icon', this.components?.icon, this.props.icon, this.iconBind.value)
    if (this.components?.icon) {
      if (this.props.icon) {
        children.push(h(this.components.icon, this.iconBind.value))
      }

      if (this.props.iconTrailing) {
        children.push(h(this.components.icon, this.trailingBind.value))
      }
    }

    return children
  }
}
