import { PropType } from 'vue'

export const subClassesDesign = {
  text: 'text'
}

export const propsDesign = {
  height: {
    type: [Boolean, String] as PropType<'sm' | 'md' | 'lg' | true | 'xl' | string>
  },
  contained: {
    type: [Boolean]
  },
  outlined: {
    type: [Boolean]
  }
}
