'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.propsChip = exports.defaultsChip = exports.subClassesChip = void 0
// Type describing subclasses
// Тип, описывающий подклассы
exports.subClassesChip = {
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
exports.defaultsChip = {
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
exports.propsChip = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    selected: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    progress: Boolean
    // :prop
  },
  // Values
  label: [Number, String],
  icon: [Object, String],
  iconTrailing: [Object, String],
  value: [Object, Number, String],
  detail: [Object],
  // Icon
  iconTurn: Boolean,
  iconHide: Boolean,
  // Progress
  progress: [Object, Boolean],
  // Status
  // Options
  tag: {
    type: String,
    default: exports.defaultsChip?.tag
  }
}
// # sourceMappingURL=props.js.map
