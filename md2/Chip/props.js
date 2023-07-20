'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.props = exports.defaults = exports.subClasses = void 0
const props_1 = require('../../constructors/Chip/props')
// Type describing subclasses
// Тип, описывающий подклассы
exports.subClasses = {
  ...props_1.subClassesChip,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    inscription: 'inscription',
    trailing: 'trailing',
    icon: 'icon'
    // :subclass
  }
}
// Default value for property
// Значение по умолчанию для свойства
exports.defaults = {
  ...props_1.defaultsChip,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    height: 'md'
    // :default
  }
}
// Constructor for property
// Конструктор для свойства
exports.props = {
  ...props_1.propsChip,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    height: {
      type: String,
      default: exports.defaults?.height
    },
    selected: Boolean,
    choice: Boolean,
    outlined: Boolean,
    palette: String,
    focus: Boolean,
    dragged: Boolean,
    progress: Boolean,
    disabled: Boolean,
    readonly: Boolean
    // :prop
  }
}
// # sourceMappingURL=props.js.map
