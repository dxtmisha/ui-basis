import { PropType } from 'vue'

export const propsImage = {
  // Values
  value: [File, String],
  coordinator: Array as PropType<number[]>,
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
