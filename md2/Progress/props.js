'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.props = exports.defaults = exports.subClasses = void 0
const props_1 = require('../../constructors/Progress/props')
// Type describing subclasses
// Тип, описывающий подклассы
exports.subClasses = {
  ...props_1.subClassesProgress,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    circle: 'circle'
    // :subclass
  }
}
// Default value for property
// Значение по умолчанию для свойства
exports.defaults = {
  ...props_1.defaultsProgress,
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
exports.props = {
  ...props_1.propsProgress,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    linear: {
      type: Boolean,
      default: exports.defaults?.linear
    },
    circular: Boolean,
    indeterminate: {
      type: String,
      default: exports.defaults?.indeterminate
    },
    position: {
      type: String,
      default: exports.defaults?.position
    },
    dense: Boolean,
    inverse: Boolean
    // :prop
  }
  // Values
  // Status
  // Options
}
// # sourceMappingURL=props.js.map
