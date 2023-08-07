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
  filled?: boolean
  elevated?: boolean
  progress?: boolean
  disabled?: boolean
  adaptive?: 'icon'
  // :type
}

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaults: PropsType = {
  ...defaultsButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
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
    filled: Boolean,
    elevated: Boolean,
    progress: Boolean,
    disabled: Boolean,
    adaptive: String as PropType<PropsType['adaptive']>
    // :prop
  }
}
