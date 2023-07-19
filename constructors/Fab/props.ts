import { PropType } from 'vue'
import { defaultsButton, propsButton, PropsButtonType } from '../Button/props'

// Type describing subclasses
// Тип, описывающий подклассы
export const subClassesFab = {
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
export type PropsFabType = PropsButtonType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  selected?: boolean
  disabled?: boolean
  progress?: boolean
  adaptive?: 'icon' | 'inscription'
  align?: 'left' | 'right' | 'center'
  // :type
}

// Default value for property
// Значение по умолчанию для свойства
export const defaultsFab = {
  ...defaultsButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  }
}

// Fab for property
// Конструктор для свойства
export const propsFab = {
  ...propsButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    selected: Boolean,
    disabled: Boolean,
    progress: Boolean,
    adaptive: String as PropType<PropsFabType['adaptive']>,
    align: String as PropType<PropsFabType['align']>
    // :prop
  }
}
