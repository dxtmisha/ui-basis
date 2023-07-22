'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.propsButton = exports.defaultsButton = exports.subClassesButton = void 0
// Type describing subclasses
// Тип, описывающий подклассы
exports.subClassesButton = {
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
exports.defaultsButton = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  },
  tag: 'button'
}
// Button for property
// Конструктор для свойства
exports.propsButton = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    selected: Boolean,
    disabled: Boolean,
    progress: Boolean,
    align: String
    // :prop
  },
  // Values
  label: [Number, String],
  icon: [Object, String],
  iconTrailing: [Object, String],
  to: String,
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
    default: exports.defaultsButton?.tag
  }
}
// # sourceMappingURL=props.js.map
