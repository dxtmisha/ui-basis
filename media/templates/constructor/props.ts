// :constructor.once import { PropType } from 'vue'

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
export type PropsConstructorBasicType = {
  // Values
  value?: string

  // Status

  // Options
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsConstructorType = PropsConstructorBasicType & {
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

// Constructor for property
// Конструктор для свойства
export const propsConstructor = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    // :prop
  },
  // Values
  value: String

  // Status

  // Options
}
