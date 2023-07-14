import { PropType } from 'vue'
import { defaultsProgress, propsProgress, PropsProgressType } from '../../constructors/Progress/props'
import { ProgressSubClassesType } from '../../constructors/Progress/types'

// Type describing subclasses
// Тип, описывающий подклассы
export type subClassesType = ProgressSubClassesType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :subclass
  circle: 'circle'
  // :subclass
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsType = PropsProgressType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  linear?: boolean
  circular?: boolean
  indeterminate?: 'type1' | 'type2'
  position?: 'top' | 'bottom'
  dense?: boolean
  inverse?: boolean
  // :type
}

// Default value for property
// Значение по умолчанию для свойства
export const defaults = {
  ...defaultsProgress,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    linear: true,
    indeterminate: 'type1',
    position: 'top'
    // :default
  }
}

// Constructor for property
// Конструктор для свойства
export const props = {
  ...propsProgress,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    linear: {
      type: Boolean,
      default: defaults?.linear
    },
    circular: Boolean,
    indeterminate: {
      type: String as PropType<PropsType['indeterminate']>,
      default: defaults?.indeterminate
    },
    position: {
      type: String as PropType<PropsType['position']>,
      default: defaults?.position
    },
    dense: Boolean,
    inverse: Boolean
    // :prop
  }
  // Values

  // Status

  // Options
}
