export interface PropsProgressInterface {
  // Values
  value?: number
  max?: number

  // Status
  visible?: boolean

  // Options
  linear?: boolean
  circular?: boolean
  delay?: number
}

export const defaultsProgress = {
  max: 100,
  delay: 480
}

export const propsProgress = {
  // Values
  value: [Number],
  max: {
    type: Number,
    default: defaultsProgress.max
  },

  // Status
  visible: Boolean,

  // Options
  linear: Boolean,
  circular: Boolean,
  delay: {
    type: Number,
    default: defaultsProgress.delay
  }
}
