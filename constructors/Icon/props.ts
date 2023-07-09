import { PropsImageInterface } from '../Image/props'

export interface PropsIconInterface {
  // Values
  icon?: string | PropsImageInterface
  iconActive?: string | PropsImageInterface

  // Status
  active?: boolean
  turn?: boolean
  disabled?: boolean

  // Options
}

export const defaultsIcon = {}

export const propsIcon = {
  // Values
  icon: [String, Object],
  iconActive: [String, Object],

  // Status
  active: Boolean,
  turn: Boolean,
  disabled: Boolean
}
