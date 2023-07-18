import {
  defaultsMutationItem,
  propsMutationItem,
  PropsMutationItemType,
  subClassesMutationItem
} from '../../constructors/MutationItem/props'

// Type describing subclasses
// Тип, описывающий подклассы
export const subClasses = {
  ...subClassesMutationItem,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsType = PropsMutationItemType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  // :type
}

// Default value for property
// Значение по умолчанию для свойства
export const defaults = {
  ...defaultsMutationItem,
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
  ...propsMutationItem,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    // :prop
  }
}
