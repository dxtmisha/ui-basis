import { PropType } from 'vue'

export const subClassesDesign = { /* classes */ }

export const propsDesign = {
  height: {
    type: [Boolean, String] as PropType<'sm' | 'md' | 'lg' | 'custom' | true | 'xl' | string>
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
