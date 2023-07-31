'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.props = exports.defaults = exports.subClasses = void 0
const props_1 = require('../../constructors/Icon/props')
// Type describing subclasses
// Тип, описывающий подклассы
exports.subClasses = {
  ...props_1.subClassesIcon,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}
// Default value for property
// Значение по умолчанию для свойства
exports.defaults = {
  ...props_1.defaultsIcon,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  }
}
// Constructor for property
// Конструктор для свойства
exports.props = {
  ...props_1.propsIcon,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    rounded: String,
    size: String,
    dynamic: Boolean,
    disabled: Boolean,
    hide: Boolean,
    animationType: String,
    animationShow: Boolean,
    overlay: Boolean,
    start: Boolean,
    end: Boolean,
    high: Boolean
    // :prop
  }
  // Values
  // Status
  // Options
}
// # sourceMappingURL=props.js.map
