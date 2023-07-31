import {
  defaultsImage,
  propsImage,
  PropsImageType,
  subClassesImage
} from '../../constructors/Image/props'

// Type describing subclasses
// Тип, описывающий подклассы
export const subClasses = {
  ...subClassesImage,
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
  disabled?: boolean
  adaptive?: boolean
  turn?: boolean
  hide?: boolean
  // :type
}

// Default value for property
// Значение по умолчанию для свойства
export const defaults = {
  ...defaultsImage,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  }
}

// Constructor for property
// Конструктор для свойства
export const props = {
  ...propsImage,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    disabled: Boolean,
    adaptive: Boolean,
    turn: Boolean,
    hide: Boolean
    // :prop
  }
  // Values

  // Status

  // Options
}
