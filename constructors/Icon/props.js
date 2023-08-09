'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.propsIcon = exports.defaultsIcon = exports.subclassesIcon = void 0
// Type describing subclasses<br>
// Тип, описывающий подклассы
exports.subclassesIcon = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}
// Default value for property<br>
// Значение по умолчанию для свойства
exports.defaultsIcon = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    animationType: 'type1'
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
    animationType: {
      type: String,
      default: exports.defaultsIcon?.animationType
    },
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
