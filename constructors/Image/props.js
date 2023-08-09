'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.propsImage = exports.defaultsImage = exports.subclassesImage = void 0
// Type describing subclasses<br>
// Тип, описывающий подклассы
exports.subclassesImage = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}
// Default value for property<br>
// Значение по умолчанию для свойства
exports.defaultsImage = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  },
  adaptiveGroup: 'main',
  url: '/icons/'
}
// Image for property
// Конструктор для свойства
exports.propsImage = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    turn: Boolean,
    disabled: Boolean,
    hide: Boolean,
    adaptive: Boolean
    // :prop
  },
  // Values
  value: [String, File],
  coordinator: Array,
  size: String,
  x: [String, Number],
  y: [String, Number],
  // Adaptive
  adaptiveGroup: {
    type: String,
    default: exports.defaultsImage.adaptiveGroup
  },
  adaptiveAlways: Boolean,
  objectWidth: Number,
  objectHeight: Number,
  // Status
  // Options
  url: {
    type: String,
    default: exports.defaultsImage.url
  }
}
// # sourceMappingURL=props.js.map
