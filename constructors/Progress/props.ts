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
  delay: 480,
  linear: (props: PropsProgressInterface) => !props.circular
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
  linear: {
    type: Boolean,
    default: defaultsProgress.linear
  },
  circular: Boolean,
  delay: {
    type: Number,
    default: defaultsProgress.delay
  }
}
