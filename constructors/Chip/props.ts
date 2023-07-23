import { PropType } from 'vue'
import { PropsIconType } from '../Icon/props'
import { PropsProgressType } from '../Progress/props'

// Type describing subclasses
// Тип, описывающий подклассы
export const subClassesChip = {
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
export type PropsChipType = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  selected?: boolean
  readonly?: boolean
  disabled?: boolean
  // :type
} & {
  // Values
  label?: string
  icon?: string | PropsIconType
  iconTrailing?: string | PropsIconType
  value?: any
  detail?: Record<string, any>

  // Icon
  iconTurn?: boolean
  iconHide?: boolean

  // Progress
  progress?: PropsProgressType /* :type.progress */ | boolean

  // Options
  tag?: 'button' | 'span' | string
}

// Default value for property
// Значение по умолчанию для свойства
export const defaultsChip = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  },
  tag: 'span'
}

// Chip for property
// Конструктор для свойства
export const propsChip = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    selected: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    progress: Boolean
    // :prop
  },
  // Values
  label: [Number, String],
  icon: [Object, String],
  iconTrailing: [Object, String],
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
    type: String as PropType<PropsChipType['tag']>,
    default: defaultsChip?.tag
  }
}
