import { PropType } from 'vue'
import { defaultsButton, propsButton, PropsButtonType, subClassesButton } from '../../constructors/Button/props'

// Type describing subclasses
// Тип, описывающий подклассы
export const subClasses = {
  ...subClassesButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    inscription: 'inscription'
    // :subclass
  }
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
  disabled?: boolean
  align?: 'left' | 'right' | 'center'
  // :type
} & {
  // Values

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
    align: 'center'
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
    height: String as PropType<PropsType['height']>,
    contained: Boolean,
    rounded: String as PropType<PropsType['rounded']>,
    disabled: Boolean,
    align: {
      type: String as PropType<PropsType['align']>,
      default: defaults?.align
    }
    // :prop
  }
  // Values

  // Status

  // Options
}
