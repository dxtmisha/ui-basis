'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.propsProgress = exports.defaultsProgress = exports.subclassesProgress = void 0
// Type describing subclasses<br>
// Тип, описывающий подклассы
exports.subclassesProgress = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    circle: 'circle'
    // :subclass
  }
}
// Default value for property<br>
// Значение по умолчанию для свойства
exports.defaultsProgress = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    linear: true,
    indeterminate: 'type1',
    position: 'top'
    // :default
  },
  max: 100,
  delay: 480
}
// Progress for property
// Конструктор для свойства
exports.propsProgress = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    linear: {
      type: Boolean,
      default: exports.defaultsProgress?.linear
    },
    circular: Boolean,
    indeterminate: {
      type: String,
      default: exports.defaultsProgress?.indeterminate
    },
    position: {
      type: String,
      default: exports.defaultsProgress?.position
    },
    dense: Boolean,
    inverse: Boolean
    // :prop
  },
  // Values
  value: Number,
  max: {
    type: Number,
    default: exports.defaultsProgress?.max
  },
  // Status
  visible: Boolean,
  // Options
  delay: {
    type: Number,
    default: exports.defaultsProgress?.delay
  }
}
// # sourceMappingURL=props.js.map
