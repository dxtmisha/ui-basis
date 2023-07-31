import { PropType } from 'vue'
import { PropsIconType } from '../Icon/props'
import { PropsProgressType } from '../Progress/props'

// Type describing subclasses
// Тип, описывающий подклассы
export const subClassesButtonIcon = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsButtonIconType = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  // :type
} & {
  // Values
  icon?: string | PropsIconType
  to?: string
  value?: any
  detail?: Record<string, any>

  // Progress
  progress?: PropsProgressType /* :type.progress */ | boolean

  // Status

  // Options
  tag?: 'button' | 'a' | 'span' | string
}

// Default value for property
// Значение по умолчанию для свойства
export const defaultsButtonIcon = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  },
  tag: 'button'
}

// ButtonIcon for property
// Конструктор для свойства
export const propsButtonIcon = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    // :prop
  },
  // Values
  icon: [Object, String],
  to: String,
  value: [Object, Number, String],
  detail: [Object],

  // Progress
  progress: [Object, Boolean],

  // Status

  // Options
  tag: {
    type: String as PropType<PropsButtonIconType['tag']>,
    default: defaultsButtonIcon?.tag
  }
}
