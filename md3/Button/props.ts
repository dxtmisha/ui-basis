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
  filled?: boolean
  outlined?: boolean
  palette?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral' | 'neutral-variant'
  focus?: boolean
  disabled?: boolean
  text?: boolean
  selected?: boolean
  adaptive?: 'icon' | 'inscription'
  align?: 'left' | 'right' | 'center'
  // :type
  /* :type.progress.none */
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
    filled: true
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
    filled: {
      type: Boolean,
      default: defaults?.filled
    },
    outlined: Boolean,
    palette: String as PropType<PropsType['palette']>,
    focus: Boolean,
    disabled: Boolean,
    text: Boolean,
    selected: Boolean,
    adaptive: String as PropType<PropsType['adaptive']>,
    align: String as PropType<PropsType['align']>
    // :prop
  }
}
