import { PropType } from 'vue'
import { defaultsChip, propsChip, PropsChipBasicType, subclassesChip } from '../../constructors/Chip/props'

// Type describing subclasses<br>
// Тип, описывающий подклассы
export const subclasses = {
  ...subclassesChip,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    icon: 'icon',
    label: 'label',
    trailing: 'trailing',
    progress: 'progress'
    // :subclass
  }
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsType = PropsChipBasicType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  height?: 'sm' | 'md' | 'lg'
  selected?: boolean
  outlined?: boolean
  elevated?: boolean
  input?: boolean
  assist?: boolean
  filter?: boolean
  suggestion?: boolean
  avatar?: boolean
  palette?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral' | 'neutral-variant'
  focus?: boolean
  dragged?: boolean
  disabled?: boolean
  progress?: boolean
  adaptive?: 'icon'
  // :type
}

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaults: PropsType = {
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
export const propsInstruction = {
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
    outlined: Boolean,
    elevated: Boolean,
    input: Boolean,
    assist: Boolean,
    filter: Boolean,
    suggestion: Boolean,
    avatar: Boolean,
    palette: String as PropType<PropsType['palette']>,
    focus: Boolean,
    dragged: Boolean,
    disabled: Boolean,
    progress: Boolean,
    adaptive: String as PropType<PropsType['adaptive']>
    // :prop
  }
}
