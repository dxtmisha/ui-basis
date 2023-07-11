import { PropType } from 'vue'
import { PropsIconInterface } from '../Icon/props'

export interface PropsButtonInterface {
  // Values
  inscription?: string
  icon?: string | PropsIconInterface
  iconTrailing?: string | PropsIconInterface
  to?: string
  value?: any
  detail?: Record<string, any>

  // Icon
  iconTurn?: boolean
  iconHide?: boolean

  // Status
  selected?: boolean,
  progress?: boolean,
  disabled?: boolean,

  // Options
  tag?: 'button' | 'a' | 'span' | string
}

export const defaultsButton = {
  tag: 'button'
}

export const propsButton = {
  // Values
  inscription: [Number, String],
  icon: [Object, String],
  iconTrailing: [Object, String],
  to: String,
  value: [Object, Number, String],
  detail: [Object],

  // Icon
  iconTurn: Boolean,
  iconHide: Boolean,

  // Status
  selected: Boolean,
  progress: Boolean,
  disabled: Boolean,

  // Options
  tag: {
    type: String as PropType<PropsButtonInterface['tag']>,
    default: defaultsButton.tag
  }
}
