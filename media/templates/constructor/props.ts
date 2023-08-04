// Type describing subclasses<br>
// Тип, описывающий подклассы
export const subclassesConstructor = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsConstructorType = {
  // Values
  value?: string

  // Status

  // Options
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsConstructorFullType = PropsConstructorType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  // :type
}

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaultsConstructor: PropsConstructorType = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  },
  value: 'value'
}
