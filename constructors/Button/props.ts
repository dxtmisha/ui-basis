import { PropType } from 'vue'

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsButtonType = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
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
    // :prop
  },
  // Values
  value: [String]

  // Status

  // Options
}
