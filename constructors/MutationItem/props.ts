// Type describing subclasses<br>
// Тип, описывающий подклассы
export const subclassesMutationItem = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsMutationItemBasicType = {
  // Values
  element?: HTMLElement

  // Status

  // Options
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsMutationItemType = PropsMutationItemBasicType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  // :type
}

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaultsMutationItem: PropsMutationItemType = {
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

  // Status

  // Options
}
