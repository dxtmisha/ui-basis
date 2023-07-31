import { PropType } from 'vue'

// Type describing subclasses
// Тип, описывающий подклассы
export const subClassesProgress = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    circle: 'circle'
    // :subclass
  }
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsProgressType = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  linear?: boolean
  circular?: boolean
  indeterminate?: 'type1' | 'type2'
  position?: 'top' | 'bottom'
  dense?: boolean
  inverse?: boolean
  // :type
} & {
  // Values
  value?: number
  max?: number

  // Status
  visible?: boolean

  // Options
  delay?: number
}

// Default value for property
// Значение по умолчанию для свойства
export const defaultsProgress = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    linear: true,
    indeterminate: 'type1',
    position: 'top'
    // :default
  },
  max: 100,
  delay: 480
}

// Progress for property
// Конструктор для свойства
export const propsProgress = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    linear: {
      type: Boolean,
      default: defaultsProgress?.linear
    },
    circular: Boolean,
    indeterminate: {
      type: String as PropType<PropsProgressType['indeterminate']>,
      default: defaultsProgress?.indeterminate
    },
    position: {
      type: String as PropType<PropsProgressType['position']>,
      default: defaultsProgress?.position
    },
    dense: Boolean,
    inverse: Boolean
    // :prop
  },
  // Values
  value: Number,
  max: {
    type: Number,
    default: defaultsProgress?.max
  },

  // Status
  visible: Boolean,

  // Options
  delay: {
    type: Number,
    default: defaultsProgress?.delay
  }
}
