import { PropType } from 'vue'

export const subClassesDesign = {
  inscription: 'inscription'
}

export const propsDesign = {
  align: {
    type: [String] as PropType<'left' | 'right' | 'center'>
  },
  height: {
    type: [String] as PropType<'sm' | 'md' | 'lg' | 'custom' | string>,
    default: 'md'
  },
  contained: {
    type: [Boolean],
    default: true
  },
  disabled: {
    type: [Boolean]
  }
}
