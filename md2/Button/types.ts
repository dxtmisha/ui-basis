import { PropType } from 'vue'
import { defaultsButton, propsButton, PropsButtonType } from '../../constructors/Button/props'
import { ButtonSubClassesType } from '../../constructors/Button/types'

// Type describing subclasses
// Тип, описывающий подклассы
export type subClassesType = ButtonSubClassesType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :subclass
  // :subclass
} & {
  // Subclass
  subclass: 'subclass'
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsType = PropsButtonType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  height?: string | 'sm' | 'md' | 'lg' | 'custom'
  contained?: boolean
  rounded?: 'none' | 'standard' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  // :type
} & {
  // Values
  value?: string

  // Status

  // Options
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
  },
  value: 'value'
}

// Constructor for property
// Конструктор для свойства
export const props = {
  ...propsButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    height: {
      type: [String] as PropType<PropsType['height']>
    },
    contained: {
      type: [Boolean] as PropType<PropsType['contained']>
    },
    rounded: {
      type: [String] as PropType<PropsType['rounded']>
    }
    // :prop
  },
  // Values
  value: [String]

  // Status

  // Options
}
