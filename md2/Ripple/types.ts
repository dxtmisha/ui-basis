import { defaultsRipple, propsRipple, PropsRippleType } from '../../constructors/Ripple/props'
import { RippleSubClassesType } from '../../constructors/Ripple/types'

// Type describing subclasses
// Тип, описывающий подклассы
export type subClassesType = RippleSubClassesType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :subclass
  item: 'item'
  // :subclass
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsType = PropsRippleType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  // :type
}

// Default value for property
// Значение по умолчанию для свойства
export const defaults = {
  ...defaultsRipple,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  }
}

// Constructor for property
// Конструктор для свойства
export const props = {
  ...propsRipple,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    // :prop
  }
  // Values

  // Status

  // Options
}
