import { PropType } from 'vue'
import { defaultsButton, propsButton, PropsButtonType } from '../Button/props'

// Type describing subclasses
// Тип, описывающий подклассы
export const subClassesFab = {
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
export type PropsFabType = PropsButtonType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  progress?: boolean
  disabled?: boolean
  adaptive?: 'icon'
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
    progress: Boolean,
    disabled: Boolean,
    adaptive: String as PropType<PropsFabType['adaptive']>
    // :prop
  }
}
