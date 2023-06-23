import { PropType } from 'vue'

// TODO: В разработке
export const subClasses = []

export const propsDesign = {
  height: {
    type: [Boolean, String] as PropType<'sm' | 'md' | 'lg' | true | 'xl' | string>
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
