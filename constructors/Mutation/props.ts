// Type describing subclasses<br>
// Тип, описывающий подклассы
export const subclassesMutation = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsMutationBasicType = {
  // Values

  // Status

  // Options
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsMutationType = PropsMutationBasicType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  // :type
}

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaultsMutation: PropsMutationType = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  }
}

// Mutation for property
// Конструктор для свойства
export const propsMutation = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    // :prop
  }
  // Values

  // Status

  // Options
}
