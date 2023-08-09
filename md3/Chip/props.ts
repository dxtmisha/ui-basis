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
  outlined?: boolean | 'border-color' | true
  elevated?: boolean
  input?: boolean
  assist?: boolean
  filter?: boolean
  suggestion?: boolean
  avatar?: boolean
  adaptive?: 'sm' | 'md' | 'icon'
  palette?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral' | 'neutral-variant'
  focus?: boolean
  dragged?: boolean
  disabled?: boolean
  filled?: boolean
  text?: boolean | 'border-color' | true
  tonal?: boolean
  // :type
  /* :type.progress.none */
}

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaults: PropsType = {
  ...defaultsChip,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    height: 'md',
    outlined: true,
    input: true,
    filled: true
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
    outlined: {
      type: [Boolean, String] as PropType<PropsType['outlined']>,
      default: defaults?.outlined
    },
    elevated: Boolean,
    input: {
      type: Boolean,
      default: defaults?.input
    },
    assist: Boolean,
    filter: Boolean,
    suggestion: Boolean,
    avatar: Boolean,
    adaptive: String as PropType<PropsType['adaptive']>,
    palette: String as PropType<PropsType['palette']>,
    focus: Boolean,
    dragged: Boolean,
    disabled: Boolean,
    filled: {
      type: Boolean,
      default: defaults?.filled
    },
    text: [Boolean, String] as PropType<PropsType['text']>,
    tonal: Boolean
    // :prop
  }
}
