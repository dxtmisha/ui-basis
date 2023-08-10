// Type describing subclasses<br>
// Тип, описывающий подклассы
export const subclassesRipple = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    item: 'item'
    // :subclass
  }
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsRippleBasicType = {
  // Values

  // Status
  disabled?: boolean

  // Options
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsRippleType = PropsRippleBasicType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  // :type
}

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaultsRipple: PropsRippleType = {
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
