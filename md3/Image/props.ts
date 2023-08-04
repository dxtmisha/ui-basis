import { defaultsImage, PropsImageType, subclassesImage } from '../../constructors/Image/props'

// Type describing subclasses
// Тип, описывающий подклассы
export const subclasses = {
  ...subclassesImage,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsType = PropsImageType & {
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
export const defaults: PropsType = {
  ...defaultsImage,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    linear: true,
    position: 'top'
    // :default
  }
}
