import { PropType } from 'vue'

// Type describing subclasses
// Тип, описывающий подклассы
export const subClassesButton = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    icon: 'icon',
    trailing: 'trailing',
    label: 'label'
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
  adaptive?: 'icon'
  // :type
} & {
  // Values
  label?: number | string
  to?: string
  value?: any
  detail?: Record<string, any>

  // Icon

  // Progress

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
    disabled: Boolean,
    adaptive: String as PropType<PropsButtonType['adaptive']>
    // :prop
  },
  // Values
  label: [Number, String],
  to: String,
  value: [Object, Boolean, Number, String],
  detail: Object,

  // Status

  // Options
  tag: {
    type: String as PropType<PropsButtonType['tag']>,
    default: defaultsButton?.tag
  }
}
