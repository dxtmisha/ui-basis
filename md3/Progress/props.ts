import { defaultsProgress, PropsProgressType, subclassesProgress } from '../../constructors/Progress/props'

// Type describing subclasses
// Тип, описывающий подклассы
export const subclasses = {
  ...subclassesProgress,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    circle: 'circle'
    // :subclass
  }
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsType = PropsProgressType & {
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

// Default value for property
// Значение по умолчанию для свойства
export const defaults: PropsType = {
  ...defaultsProgress,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    linear: true,
    indeterminate: 'type1',
    position: 'top'
    // :default
  }
}
