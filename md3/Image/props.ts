// import { PropType } from 'vue'
import { defaultsImage, propsImage, PropsImageBasicType, subclassesImage } from '../../constructors/Image/props'

// Type describing subclasses<br>
// Тип, описывающий подклассы
export const subclasses = {
  ...subclassesImage,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsType = PropsImageBasicType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  disabled?: boolean
  turn?: boolean
  hide?: boolean
  adaptive?: boolean
  // :type
}

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaults: PropsType = {
  ...defaultsImage,
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
  ...propsImage,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    disabled: Boolean,
    turn: Boolean,
    hide: Boolean,
    adaptive: Boolean
    // :prop
  }
}
