import { PropType } from 'vue'

export const propsDesign = {
  height: {
    type: [Boolean, String] as PropType<'sm' | 'md' | 'lg' | true>
  },
  contained: {
    type: [Boolean]
  },
  outlined: {
    type: [Boolean]
  },
  text: {
    type: [Boolean]
  }
}
