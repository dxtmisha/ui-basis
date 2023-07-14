import { PropType } from 'vue'

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsButtonType = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  disabled?: boolean
  align?: 'left' | 'right' | 'center'
  // :type
} & {
  // Values
  value?: string

  // Status

  // Options
}

// Default value for property
// Значение по умолчанию для свойства
export const defaultsButton = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    align: 'center'
    // :default
  },
  value: 'value'
}

// Button for property
// Конструктор для свойства
export const propsButton = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    disabled: {
      type: [Boolean] as PropType<PropsButtonType['disabled']>
    },
    align: {
      type: [String] as PropType<PropsButtonType['align']>,
      default: defaultsButton?.align
    }
    // :prop
  },
  // Values
  value: [String]

  // Status

  // Options
}
