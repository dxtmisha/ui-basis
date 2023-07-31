import { PropType } from 'vue'
import { PropsImageType } from '../Image/props'

// Type describing subclasses
// Тип, описывающий подклассы
export const subClassesIcon = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsIconType = {
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
} & {
  // Values
  icon?: string | PropsImageType
  iconActive?: string | PropsImageType

  // Status
  active?: boolean
  turn?: boolean

  // Options
}

// Default value for property
// Значение по умолчанию для свойства
export const defaultsIcon = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  }
}

// Icon for property
// Конструктор для свойства
export const propsIcon = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    disabled: Boolean,
    hide: Boolean,
    animationType: String as PropType<PropsIconType['animationType']>,
    animationShow: Boolean,
    overlay: Boolean,
    dynamic: Boolean,
    start: Boolean,
    end: Boolean,
    high: Boolean
    // :prop
  },
  // Values
  icon: [String, Object],
  iconActive: [String, Object],

  // Status
  active: Boolean,
  turn: Boolean

  // Options
}
