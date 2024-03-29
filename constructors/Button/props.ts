import { PropType } from 'vue'
import { PropsIconType } from '../Icon/props'
import { PropsProgressType } from '../Progress/props'

// Type describing subclasses
// Тип, описывающий подклассы
export const subClassesButton = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    label: 'label',
    icon: 'icon',
    trailing: 'trailing'
    // :subclass
  }
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsButtonType = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  disabled?: boolean
  // :type
  /* :type.adaptive.none */
} & {
  // Values
  label?: string
  icon?: string | PropsIconType
  iconTrailing?: string | PropsIconType
  to?: string
  value?: any
  detail?: Record<string, any>

  // Icon
  iconTurn?: boolean
  iconHide?: boolean

  // Progress
  progress?: PropsProgressType /* :type.progress */ | boolean

  // Status

  // Options
  tag?: 'button' | 'a' | 'span' | string
}

// Default value for property
// Значение по умолчанию для свойства
export const defaultsButton = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  },
  tag: 'button'
}

// Button for property
// Конструктор для свойства
export const propsButton = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    progress: Boolean,
    disabled: Boolean
    // :prop
  },
  // Values
  label: [Number, String],
  icon: [Object, String],
  iconTrailing: [Object, String],
  to: String,
  value: [Object, Number, String],
  detail: [Object],

  // Icon
  iconTurn: Boolean,
  iconHide: Boolean,

  // Progress
  progress: [Object, Boolean],

  // Status

  // Options
  tag: {
    type: String as PropType<PropsButtonType['tag']>,
    default: defaultsButton?.tag
  }
}
