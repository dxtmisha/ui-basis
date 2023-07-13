import { PropsImageInterface } from '../Image/props'
import { PropType } from 'vue'

export interface PropsIconInterface {
  // Values
  icon?: string | PropsImageInterface
  iconActive?: string | PropsImageInterface

  // Status
  active?: boolean
  turn?: boolean
  disabled?: boolean

  // Options
  animationType?: 'type1' | 'type2'
  end?: boolean
}

export const defaultsIcon = {
  animationType: 'type1'
}

export const propsIcon = {
  // Values
  icon: [String, Object],
  iconActive: [String, Object],

  // Status
  active: Boolean,
  turn: Boolean,
  disabled: Boolean,

  // Options
  animationType: {
    type: String as PropType<PropsIconInterface['animationType']>,
    default: defaultsIcon.animationType
  },
  end: Boolean
}
