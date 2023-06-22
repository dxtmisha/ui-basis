import { PropType } from 'vue'

export const propsDesign = {
  height: {
    type: [String] as PropType<'sm' | 'md' | 'lg' | 'border-radius'>
  },
  contained: {
    type: [Boolean]
  },
  outlined: {
    type: [Boolean]
  },
  lessPronounced: {
    type: [Boolean]
  }
}
