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
  selected?: boolean
  filled?: boolean
  outlined?: boolean
  text?: boolean
  elevated?: boolean
  tonal?: boolean
  adaptive?: 'sm' | 'md' | 'icon'
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
    selected: Boolean,
    filled: {
      type: Boolean,
      default: defaults?.filled
    },
    outlined: Boolean,
    text: Boolean,
    elevated: Boolean,
    tonal: Boolean,
    adaptive: String as PropType<PropsType['adaptive']>,
    focus: Boolean,
    disabled: Boolean
    // :prop
  }
}
