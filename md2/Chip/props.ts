import { PropType } from 'vue'
import { defaultsChip, propsChip, PropsChipType, subClassesChip } from '../../constructors/Chip/props'

// Type describing subclasses
// Тип, описывающий подклассы
export const subClasses = {
  ...subClassesChip,
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
export type PropsType = PropsChipType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  height?: string | 'sm' | 'md' | 'lg' | 'custom'
  choice?: boolean
  palette?: 'red' | 'pink' | 'purple' | 'deep-purple' | 'indigo' | 'blue' | 'light-blue' | 'cyan' | 'teal' | 'green' | 'light-green' | 'lime' | 'yellow' | 'amber' | 'orange' | 'deep-orange' | 'brown' | 'grey' | 'grey-blue' | 'white' | 'black' | 'black-light'
  focus?: boolean
  dragged?: boolean
  selected?: boolean
  progress?: boolean
  disabled?: boolean
  readonly?: boolean
  // :type
}

// Default value for property
// Значение по умолчанию для свойства
export const defaults = {
  ...defaultsChip,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    height: 'md'
    // :default
  }
}

// Constructor for property
// Конструктор для свойства
export const props = {
  ...propsChip,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    height: {
      type: String as PropType<PropsType['height']>,
      default: defaults?.height
    },
    choice: Boolean,
    palette: String as PropType<PropsType['palette']>,
    focus: Boolean,
    dragged: Boolean,
    selected: Boolean,
    progress: Boolean,
    disabled: Boolean,
    readonly: Boolean
    // :prop
  }
}
