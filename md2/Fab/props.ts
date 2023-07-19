import { PropType } from 'vue'
import { defaultsFab, propsFab, PropsFabType, subClassesFab } from '../../constructors/Fab/props'

// Type describing subclasses
// Тип, описывающий подклассы
export const subClasses = {
  ...subClassesFab,
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
export type PropsType = PropsFabType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  height?: string | 'sm' | 'md' | 'lg' | 'custom'
  contained?: boolean
  adaptive?: 'sm' | 'md' | 'lg' | 'icon' | 'inscription'
  palette?: 'red' | 'pink' | 'purple' | 'deep-purple' | 'indigo' | 'blue' | 'light-blue' | 'cyan' | 'teal' | 'green' | 'light-green' | 'lime' | 'yellow' | 'amber' | 'orange' | 'deep-orange' | 'brown' | 'grey' | 'grey-blue' | 'white' | 'black' | 'black-light'
  focus?: boolean
  dragged?: boolean
  progress?: boolean
  disabled?: boolean
  rounded?: 'none' | 'standard' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  selected?: boolean
  align?: 'left' | 'right' | 'center'
  // :type
}

// Default value for property
// Значение по умолчанию для свойства
export const defaults = {
  ...defaultsFab,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    height: 'lg',
    contained: true
    // :default
  }
}

// Constructor for property
// Конструктор для свойства
export const props = {
  ...propsFab,
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
    adaptive: String as PropType<PropsType['adaptive']>,
    palette: String as PropType<PropsType['palette']>,
    focus: Boolean,
    dragged: Boolean,
    progress: Boolean,
    disabled: Boolean,
    rounded: String as PropType<PropsType['rounded']>,
    selected: Boolean,
    align: String as PropType<PropsType['align']>
    // :prop
  }
}
