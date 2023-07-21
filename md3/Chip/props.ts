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
  selected?: boolean
  palette?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral' | 'neutral-variant'
  focus?: boolean
  dragged?: boolean
  progress?: boolean
  disabled?: boolean
  elevated?: boolean
  assist?: boolean
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
    selected: Boolean,
    palette: String as PropType<PropsType['palette']>,
    focus: Boolean,
    dragged: Boolean,
    progress: Boolean,
    disabled: Boolean,
    elevated: Boolean,
    assist: Boolean,
    readonly: Boolean
    // :prop
  }
}
