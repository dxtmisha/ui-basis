import { PropsImageFullType } from '../Image/props'

// Type describing subclasses<br>
// Тип, описывающий подклассы
export const subclassesIcon = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsIconType = {
  // Values
  icon?: string | PropsImageFullType
  iconActive?: string | PropsImageFullType

  // Status
  active?: boolean
  turn?: boolean
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsIconFullType = PropsIconType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  disabled?: boolean
  hide?: boolean
  animationType?: 'type1' | 'type2'
  animationShow?: boolean
  overlay?: boolean
  dynamic?: boolean
  start?: boolean
  end?: boolean
  high?: boolean
  // :type
}

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaultsIcon: PropsIconType = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  }
}
