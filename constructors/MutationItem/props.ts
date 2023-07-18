// Type describing subclasses
// Тип, описывающий подклассы
export const subClassesMutationItem = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsMutationItemType = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  // :type
} & {
  // Values
  element: HTMLElement
}

// Default value for property
// Значение по умолчанию для свойства
export const defaultsMutationItem = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  }
}

// MutationItem for property
// Конструктор для свойства
export const propsMutationItem = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    // :prop
  },
  // Values
  element: HTMLElement
}
