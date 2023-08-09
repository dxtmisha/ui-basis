import { PropType } from 'vue'
import { defaultsButton, propsButton, PropsButtonBasicType, subclassesButton } from '../../constructors/Button/props'

// Type describing subclasses<br>
// Тип, описывающий подклассы
export const subclasses = {
  ...subclassesButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    label: 'label',
    icon: 'icon',
    trailing: 'trailing',
    progress: 'progress'
    // :subclass
  }
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsType = PropsButtonBasicType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  height?: 'sm' | 'md' | 'lg'
  selected?: boolean
  filled?: boolean
  outlined?: boolean | 'border-color' | true
  text?: boolean | 'border-color' | true
  elevated?: boolean
  tonal?: boolean
  adaptive?: 'sm' | 'md' | 'icon'
  palette?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral' | 'neutral-variant'
  focus?: boolean
  disabled?: boolean
  // :type
  /* :type.progress.none */
}

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaults: PropsType = {
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
export const propsInstruction = {
  ...propsButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    height: {
      type: String as PropType<PropsType['height']>,
      default: defaults?.height
    },
    selected: Boolean,
    filled: {
      type: Boolean,
      default: defaults?.filled
    },
    outlined: [Boolean, String] as PropType<PropsType['outlined']>,
    text: [Boolean, String] as PropType<PropsType['text']>,
    elevated: Boolean,
    tonal: Boolean,
    adaptive: String as PropType<PropsType['adaptive']>,
    palette: String as PropType<PropsType['palette']>,
    focus: Boolean,
    disabled: Boolean
    // :prop
  }
}
