// :basic.once import { PropType } from 'vue'
// :constructor.once import { PropType } from 'vue'
// :constructor.once import { defaultsConstructor, propsConstructor, PropsConstructorType, subClassesConstructor } from '../../../constructors/Constructor/props'

// Type describing subclasses
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

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type PropsType = /* :constructor.once PropsConstructorType & */ {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  // :type
}

// Default value for property
// Значение по умолчанию для свойства
export const defaults = {
  /* :constructor.once ...defaultsConstructor, */
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
  /* :constructor.once ...propsConstructor, */
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    // :prop
  }
}
