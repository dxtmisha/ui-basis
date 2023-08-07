import { PropType } from 'vue'
import { defaultsIcon, propsIcon, PropsIconBasicType, subclassesIcon } from '../../constructors/Icon/props'

// Type describing subclasses<br>
// Тип, описывающий подклассы
export const subclasses = {
  ...subclassesIcon,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsType = PropsIconBasicType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  rounded?: 'none' | 'standard' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  overlay?: boolean
  dynamic?: boolean
  disabled?: boolean
  hide?: boolean
  animationType?: 'type1' | 'type2'
  animationShow?: boolean
  start?: boolean
  end?: boolean
  high?: boolean
  // :type
}

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaults: PropsType = {
  ...defaultsIcon,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    animationType: 'type1'
    // :default
  }
}

// Constructor for property
// Конструктор для свойства
export const propsInstruction = {
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
    animationType: {
      type: String as PropType<PropsType['animationType']>,
      default: defaults?.animationType
    },
    animationShow: Boolean,
    start: Boolean,
    end: Boolean,
    high: Boolean
    // :prop
  }
}
