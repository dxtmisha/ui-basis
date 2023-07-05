import { PropType } from 'vue'

export const propsImage = {
  // Values
  value: [File, String],
  coordinator: Array as PropType<number[]>,
  size: [String, Number],
  x: [String, Number],
  y: [String, Number],

  // Adaptive
  adaptive: Boolean,
  objectWidth: Number,
  objectHeight: Number,

  // Status
  disabled: Boolean,

  // Options
  url: {
    type: String,
    default: '/icons/'
  }
}
