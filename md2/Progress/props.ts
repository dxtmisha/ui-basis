import { PropType } from 'vue'
import { defaultsProgress, propsProgress, PropsProgressBasicType, subclassesProgress } from '../../constructors/Progress/props'

// Type describing subclasses<br>
// Тип, описывающий подклассы
export const subclasses = {
  ...subclassesProgress,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    circle: 'circle'
    // :subclass
  }
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsType = PropsProgressBasicType & {
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

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaults: PropsType = {
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
export const propsInstruction = {
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
}
