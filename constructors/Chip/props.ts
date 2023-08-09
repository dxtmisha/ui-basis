import { PropType } from 'vue'
import { defaultsButton, propsButton, PropsButtonBasicType, subclassesButton } from '../Button/props'

// Type describing subclasses<br>
// Тип, описывающий подклассы
export const subclassesChip = {
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
export type PropsChipBasicType = PropsButtonBasicType

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsChipType = PropsChipBasicType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  selected?: boolean
  disabled?: boolean
  adaptive?: 'icon'
  // :type
  /* :type.progress.none */
}

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaultsChip: PropsChipType = {
  ...defaultsButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  },
  tag: 'span'
}

// Chip for property
// Конструктор для свойства
export const propsChip = {
  ...propsButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    selected: Boolean,
    disabled: Boolean,
    adaptive: String as PropType<PropsChipType['adaptive']>
    // :prop
  }
}
