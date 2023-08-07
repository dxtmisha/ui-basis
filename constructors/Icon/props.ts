import { PropType } from 'vue'
import { PropsImageType } from '../Image/props'

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
export type PropsIconBasicType = {
  // Values
  icon?: string | object | PropsImageType
  iconActive?: string | object | PropsImageType

  // Status
  active?: boolean
  turn?: boolean

  // Options
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsIconType = PropsIconBasicType & {
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
    animationType: 'type1'
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
    animationType: {
      type: String as PropType<PropsIconType['animationType']>,
      default: defaultsIcon?.animationType
    },
    animationShow: Boolean,
    overlay: Boolean,
    dynamic: Boolean,
    start: Boolean,
    end: Boolean,
    high: Boolean
    // :prop
  },
  // Values
  icon: [String, Object] as PropType<PropsIconBasicType['icon']>,
  iconActive: [String, Object] as PropType<PropsIconBasicType['iconActive']>,

  // Status
  active: Boolean,
  turn: Boolean

  // Options
}
