import { PropType } from 'vue'
import { defaultsIcon, propsIcon, PropsIconType } from '../../constructors/Icon/props'
import { IconSubClassesType } from '../../constructors/Icon/types'

// Type describing subclasses
// Тип, описывающий подклассы
export type subClassesType = IconSubClassesType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :subclass
  // :subclass
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
    rounded: 'full',
    size: 'xs',
    animationType: 'type1'
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
    rounded: {
      type: String as PropType<PropsType['rounded']>,
      default: defaults?.rounded
    },
    size: {
      type: String as PropType<PropsType['size']>,
      default: defaults?.size
    },
    overlay: Boolean,
    dynamic: Boolean,
    disabled: Boolean,
    hide: Boolean,
    animationType: {
      type: String as PropType<PropsType['animationType']>,
      default: defaults?.animationType
    },
    animationShow: Boolean,
    end: Boolean
    // :prop
  }
  // Values

  // Status

  // Options
}
