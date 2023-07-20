'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.propsImage = exports.defaultsImage = exports.subClassesImage = void 0
// Type describing subclasses
// Тип, описывающий подклассы
exports.subClassesImage = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    // :subclass
  }
}
// Default value for property
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
    adaptive: Boolean,
    turn: Boolean,
    disabled: Boolean,
    hide: Boolean
    // :prop
  },
  value: [String, File],
  coordinator: Array,
  size: [String, Number],
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
  // Options
  url: {
    type: String,
    default: exports.defaultsImage.url
  }
}
// # sourceMappingURL=props.js.map
