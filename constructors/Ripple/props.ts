// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsRippleType = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  // :type
} & {
  // Values

  // Status
  disabled?: boolean

  // Options
}

// Default value for property
// Значение по умолчанию для свойства
export const defaultsRipple = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  }
}

// Ripple for property
// Конструктор для свойства
export const propsRipple = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    // :prop
  },
  // Values

  // Status
  disabled: Boolean

  // Options
}
