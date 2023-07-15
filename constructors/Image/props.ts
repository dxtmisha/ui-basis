import { PropType } from 'vue'

// Type describing subclasses
// Тип, описывающий подклассы
export const subClassesImage = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsImageType = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  adaptive?: boolean
  turn?: boolean
  disabled?: boolean
  hide?: boolean
  // :type
} & {
  // Values
  value?: string | File
  coordinator?: [number, number?, number?, number?]
  size?: 'auto' | 'contain' | 'cover' | string | number
  x?: string | number
  y?: string | number

  // Adaptive
  adaptiveGroup?: string
  adaptiveAlways?: boolean
  objectWidth?: number
  objectHeight?: number

  // Options
  url?: string
}

// Default value for property
// Значение по умолчанию для свойства
export const defaultsImage = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  },
  adaptiveGroup: 'main',
  url: '/icons/'
}

// Image for property
// Конструктор для свойства
export const propsImage = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    adaptive: Boolean,
    turn: Boolean,
    disabled: Boolean,
    hide: Boolean
    // :prop
  },
  value: [String, File],
  coordinator: Array as PropType<number[]>,
  size: [String, Number],
  x: [String, Number],
  y: [String, Number],

  // Adaptive
  adaptiveGroup: {
    type: String,
    default: defaultsImage.adaptiveGroup
  },
  adaptiveAlways: Boolean,
  objectWidth: Number,
  objectHeight: Number,

  // Options
  url: {
    type: String,
    default: defaultsImage.url
  }
}
