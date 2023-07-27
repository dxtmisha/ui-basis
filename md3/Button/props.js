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
    label: 'label',
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
    filled: true
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
    filled: {
      type: Boolean,
      default: exports.defaults?.filled
    },
    outlined: Boolean,
    text: Boolean,
    elevated: Boolean,
    tonal: Boolean,
    palette: String,
    disabled: Boolean,
    adaptive: String,
    focus: Boolean
    // :prop
  }
}
// # sourceMappingURL=props.js.map
