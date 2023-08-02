import { PropType } from 'vue'
import { defaultsButton, PropsButtonType, subclassesButton } from '../../constructors/Button/props'

// Type describing subclasses
// Тип, описывающий подклассы
export const subclasses = {
  ...subclassesButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsType = PropsButtonType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  filled?: boolean
  elevated?: boolean
  // :type
}

// Default value for property
// Значение по умолчанию для свойства
export const defaults = {
  ...defaultsButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  }
}
