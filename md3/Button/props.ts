import {
  defaultsButton,
  propsButton,
  PropsButtonType,
  subClassesButton
} from '../../constructors/Button/props'

// Type describing subclasses
// Тип, описывающий подклассы
export const subClasses = {
  ...subClassesButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    icon: 'icon',
    trailing: 'trailing',
    label: 'label'
    // :subclass
  }
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsType = PropsButtonType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  filled?: boolean
  elevated?: boolean
  disabled?: boolean
  adaptive?: 'icon'
  // :type
}

// Default value for property
// Значение по умолчанию для свойства
export const defaults = {
  ...defaultsButton,
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
  ...propsButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    filled: Boolean,
    elevated: Boolean,
    disabled: Boolean,
    adaptive: String as PropType<PropsType['adaptive']>
    // :prop
  }
}
