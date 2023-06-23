import { PropType } from 'vue'

export type subClasses = ['inscription']

export const propsDesign = {
  height: {
    type: [Boolean, String] as PropType<'sm' | 'md' | 'lg' | true | string>
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
