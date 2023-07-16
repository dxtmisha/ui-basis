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
    inscription: 'inscription',
    icon: 'icon',
    trailing: 'trailing'
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
  dragged?: boolean
  contained?: boolean
  outlined?: boolean
  text?: boolean
  rounded?: 'none' | 'standard' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  focus?: boolean
  disabled?: boolean
  align?: 'left' | 'right' | 'center'
  // :type
  /* :type.progress.none */
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
    height: 'md',
    contained: true,
    rounded: 'standard',
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
    height: {
      type: String as PropType<PropsType['height']>,
      default: defaults?.height
    },
    dragged: Boolean,
    contained: {
      type: Boolean,
      default: defaults?.contained
    },
    outlined: Boolean,
    text: Boolean,
    rounded: {
      type: String as PropType<PropsType['rounded']>,
      default: defaults?.rounded
    },
    focus: Boolean,
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
