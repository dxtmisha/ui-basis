import { PropType } from 'vue'

export interface PropsImageInterface {
  // Values
  value: string | File
  coordinator: [number, number?, number?, number?]
  size: string | number
  x: string | number
  y: string | number

  // Adaptive
  adaptive: boolean
  adaptiveGroup: string
  adaptiveAlways: boolean
  objectWidth: number
  objectHeight: number

  // Options
  url: string
}

export const defaultsImage = {
  adaptiveGroup: 'main',
  url: '/icons/'
}

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
    default: defaultsImage.adaptiveGroup
  },
  adaptiveAlways: Boolean,
  objectWidth: Number,
  objectHeight: Number,

  // Options
  url: {
    type: String,
    default: defaultsImage.url
  }
}
