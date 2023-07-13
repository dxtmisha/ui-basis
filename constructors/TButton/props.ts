import { PropType } from 'vue'

import { PropsIconInterface } from '../Icon/props'
import { PropsProgressInterface } from '../Progress/props'

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

  // Progress
  progress?: boolean | PropsProgressInterface,
  progressPosition?: 'center' | 'icon' | 'trailing',

  // Status
  selected?: boolean,
  disabled?: boolean,

  // Options
  tag?: 'button' | 'a' | 'span' | string
}

export const defaultsButton = {
  progressPosition: 'center',
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

  // Progress
  progress: [Object, Boolean],
  progressPosition: {
    type: String as PropType<PropsButtonInterface['progressPosition']>,
    default: defaultsButton.progressPosition
  },

  // Status
  selected: Boolean,
  disabled: Boolean,

  // Options
  tag: {
    type: String as PropType<PropsButtonInterface['tag']>,
    default: defaultsButton.tag
  }
}
