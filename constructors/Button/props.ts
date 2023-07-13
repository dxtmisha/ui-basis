import { PropType } from 'vue'

export type PropsButtonType = {
  // :type
  disabled?: boolean
  align?: 'left' | 'right' | 'center'
  // :type

  // Values
  value?: string

  // Status

  // Options
}

export const defaultsButton = {
  // :default
  align: 'center',
  // :default

  value: 'value'
}

export const propsButton = {
  // :prop
  disabled: {
    type: [Boolean] as PropType<PropsButtonType['disabled']>
  },
  align: {
    type: [String] as PropType<PropsButtonType['align']>,
    default: defaultsButton?.align
  },
  // :prop

  // Values
  value: [String]

  // Status

  // Options
}
