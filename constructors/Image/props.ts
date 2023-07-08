import { PropType } from 'vue'

export const propsImage = {
  // Values
  value: [String, File],
  coordinator: Array as PropType<number[]>,
  size: [String, Number],
  x: [String, Number],
  y: [String, Number],

  // Adaptive
  adaptive: Boolean,
  adaptiveGroup: {
    type: String,
    default: 'main'
  },
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
