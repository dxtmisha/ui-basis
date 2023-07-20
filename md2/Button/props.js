'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.props = exports.defaults = exports.subClasses = void 0
const props_1 = require('../../constructors/Button/props')
// Type describing subclasses
// Тип, описывающий подклассы
exports.subClasses = {
  ...props_1.subClassesButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    inscription: 'inscription',
    icon: 'icon',
    trailing: 'trailing'
    // :subclass
  }
}
// Default value for property
// Значение по умолчанию для свойства
exports.defaults = {
  ...props_1.defaultsButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    height: 'md',
    contained: true
    // :default
  }
}
// Constructor for property
// Конструктор для свойства
exports.props = {
  ...props_1.propsButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    height: {
      type: String,
      default: exports.defaults?.height
    },
    contained: {
      type: Boolean,
      default: exports.defaults?.contained
    },
    outlined: Boolean,
    text: Boolean,
    adaptive: String,
    palette: String,
    focus: Boolean,
    dragged: Boolean,
    disabled: Boolean,
    rounded: String,
    selected: Boolean,
    align: String
    // :prop
  }
}
// # sourceMappingURL=props.js.map
