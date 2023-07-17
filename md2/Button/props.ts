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
  contained?: boolean
  outlined?: boolean
  text?: boolean
  adaptive?: 'sm' | 'md' | 'lg' | 'icon' | 'inscription'
  palette?: 'red' | 'pink' | 'purple' | 'deep-purple' | 'indigo' | 'blue' | 'light-blue' | 'cyan' | 'teal' | 'green' | 'light-green' | 'lime' | 'yellow' | 'amber' | 'orange' | 'deep-orange' | 'brown' | 'grey' | 'grey-blue' | 'white' | 'black' | 'black-light'
  focus?: boolean
  dragged?: boolean
  selected?: boolean
  disabled?: boolean
  rounded?: 'none' | 'standard' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
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
    contained: true
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
    contained: {
      type: Boolean,
      default: defaults?.contained
    },
    outlined: Boolean,
    text: Boolean,
    adaptive: String as PropType<PropsType['adaptive']>,
    palette: String as PropType<PropsType['palette']>,
    focus: Boolean,
    dragged: Boolean,
    selected: Boolean,
    disabled: Boolean,
    rounded: String as PropType<PropsType['rounded']>,
    align: String as PropType<PropsType['align']>
    // :prop
  }
  // Values

  // Status

  // Options
}
