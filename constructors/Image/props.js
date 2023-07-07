'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.propsImage = void 0
exports.propsImage = {
  // Values
  value: [File, String],
  coordinator: Array,
  size: [String, Number],
  x: [String, Number],
  y: [String, Number],
  // Adaptive
  group: {
    type: String,
    default: 'main'
  },
  adaptive: Boolean,
  adaptiveAlways: Boolean,
  objectWidth: Number,
  objectHeight: Number,
  // Status
  // Options
  url: {
    type: String,
    default: '/icons/'
  }
}
// # sourceMappingURL=props.js.map
