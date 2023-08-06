import { PropType } from 'vue'

// Type describing subclasses<br>
// Тип, описывающий подклассы
export const subclassesImage = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsImageBasicType = {
  // Values
  value?: string | File
  coordinator?: [number, number?, number?, number?] | number[] | any
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

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsImageType = PropsImageBasicType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  turn?: boolean
  disabled?: boolean
  hide?: boolean
  adaptive?: boolean
  // :type
}

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaultsImage: PropsImageType = {
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
    turn: Boolean,
    disabled: Boolean,
    hide: Boolean,
    adaptive: Boolean
    // :prop
  },
  // Values
  value: [String, File],
  coordinator: Array,
  size: String as PropType<PropsImageBasicType['size']>,
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

  // Status

  // Options
  url: {
    type: String,
    default: defaultsImage.url
  }
}
