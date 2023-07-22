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
    label: 'label',
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
  text?: boolean
  outlined?: boolean
  contained?: boolean
  adaptive?: 'sm' | 'md' | 'lg' | 'icon'
  palette?: 'red' | 'pink' | 'purple' | 'deep-purple' | 'indigo' | 'blue' | 'light-blue' | 'cyan' | 'teal' | 'green' | 'light-green' | 'lime' | 'yellow' | 'amber' | 'orange' | 'deep-orange' | 'brown' | 'grey' | 'grey-blue' | 'white' | 'black' | 'black-light'
  dragged?: boolean
  disabled?: boolean
  focus?: boolean
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
    text: Boolean,
    outlined: Boolean,
    contained: {
      type: Boolean,
      default: defaults?.contained
    },
    adaptive: String as PropType<PropsType['adaptive']>,
    palette: String as PropType<PropsType['palette']>,
    dragged: Boolean,
    disabled: Boolean,
    focus: Boolean
    // :prop
  }
}
