// Type describing subclasses
// Тип, описывающий подклассы
export const subclassesImage = {
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

export type PropsImageFullType = PropsImageType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  turn?: boolean
  disabled?: boolean
  hide?: boolean
  adaptive?: boolean
  linear?: boolean
  position?: 'top' | 'bottom'
  // :type
}

// Default value for property
// Значение по умолчанию для свойства
export const defaultsImage: PropsImageType = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    linear: true,
    position: 'top'
    // :default
  },
  adaptiveGroup: 'main',
  url: '/icons/'
}
