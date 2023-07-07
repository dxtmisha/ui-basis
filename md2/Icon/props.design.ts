import { PropType } from 'vue'

export const subClassesDesign = { /* classes */ }

export const propsDesign = {
  rounded: {
    type: [String] as PropType<'none' | 'standard' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>,
    default: 'full'
  },
  size: {
    type: [String] as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl'>,
    default: 'xs'
  },
  overlay: {
    type: [Boolean]
  },
  dynamic: {
    type: [Boolean]
  },
  disabled: {
    type: [Boolean]
  },
  hide: {
    type: [Boolean]
  },
  animationType: {
    type: [String] as PropType<'type1' | 'type2'>
  },
  animationShow: {
    type: [Boolean]
  },
  end: {
    type: [Boolean]
  }
}
