// :constructor.once import { defaultsConstructor, PropsConstructorType, subclassesConstructor } from '../../../constructors/Constructor/props'

// Type describing subclasses<br>
// Тип, описывающий подклассы
export const subclasses = {
  /* :constructor.once ...subclassesConstructor, */
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsType = /* :constructor.once PropsConstructorType & */ {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  // :type
}

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaults: PropsType = {
  /* :constructor.once ...defaultsConstructor, */
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  }
}
