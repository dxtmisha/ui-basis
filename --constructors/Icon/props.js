'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.propsIcon = exports.defaultsIcon = exports.subClassesIcon = void 0
// Type describing subclasses
// Тип, описывающий подклассы
exports.subClassesIcon = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}
// Default value for property
// Значение по умолчанию для свойства
exports.defaultsIcon = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  }
}
// Icon for property
// Конструктор для свойства
exports.propsIcon = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    disabled: Boolean,
    hide: Boolean,
    animationType: String,
    animationShow: Boolean,
    overlay: Boolean,
    dynamic: Boolean,
    start: Boolean,
    end: Boolean,
    high: Boolean
    // :prop
  },
  // Values
  icon: [String, Object],
  iconActive: [String, Object],
  // Status
  active: Boolean,
  turn: Boolean
  // Options
}
// # sourceMappingURL=props.js.map
