// import { PropType } from 'vue'

export const subClassesDesign = { /* classes */ }

export interface PropsDesignInterface {
  rounded?: 'none' | 'standard' | 'sm' | 'md' | 'lg' | 'xl' | 'full',
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  overlay?: boolean,
  dynamic?: boolean,
  disabled?: boolean,
  hide?: boolean,
  animationType?: 'type1' | 'type2',
  animationShow?: boolean,
  end?: boolean
}
export const defaultsDesign = {
  rounded: 'full',
  size: 'xs'
}

// export const propsDesign = { /* sample */ }
