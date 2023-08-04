// Type describing subclasses<br>
// Тип, описывающий подклассы
export const subclassesProgress = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    circle: 'circle'
    // :subclass
  }
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsProgressType = {
  // Values
  value?: number
  max?: number

  // Status
  visible?: boolean

  // Options
  delay?: number
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsProgressFullType = PropsProgressType & {
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
}

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaultsProgress: PropsProgressType = {
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
