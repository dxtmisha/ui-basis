// :basic.once import { PropType } from 'vue'
// :constructor.once import { PropType } from 'vue'
// :constructor.once import { defaultsConstructor, propsConstructor, PropsConstructorType } from '../../../constructors/Constructor/props'
// :constructor.once import { ConstructorSubClassesType } from '../../../constructors/Button/types'

// Type describing subclasses
// Тип, описывающий подклассы
export type subClassesType = /* :constructor.once ConstructorSubClassesType & */ {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :subclass
  // :subclass
} & {
  // Subclass
  subclass: 'subclass'
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsType = /* :constructor.once PropsConstructorType & */ {
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
export const defaults = {
  /* :constructor.once ...defaultsConstructor, */
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
export const props = {
  /* :constructor.once ...propsConstructor, */
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
