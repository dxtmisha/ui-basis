import { PropType } from 'vue'

import {
  defaultsIcon,
  propsIcon,
  PropsIconType,
  subClassesIcon
} from '../../constructors/Icon/props'

// Type describing subclasses
// Тип, описывающий подклассы
export const subClasses = {
  ...subClassesIcon,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsType = PropsIconType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  rounded?: 'none' | 'standard' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  overlay?: boolean
  dynamic?: boolean
  disabled?: boolean
  hide?: boolean
  animationType?: 'type1' | 'type2'
  animationShow?: boolean
  end?: boolean
  high?: boolean
  // :type
}

// Default value for property
// Значение по умолчанию для свойства
export const defaults = {
  ...defaultsIcon,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  }
}

// Constructor for property
// Конструктор для свойства
export const props = {
  ...propsIcon,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    rounded: String as PropType<PropsType['rounded']>,
    size: String as PropType<PropsType['size']>,
    overlay: Boolean,
    dynamic: Boolean,
    disabled: Boolean,
    hide: Boolean,
    animationType: String as PropType<PropsType['animationType']>,
    animationShow: Boolean,
    end: Boolean,
    high: Boolean
    // :prop
  }
  // Values

  // Status

  // Options
}
