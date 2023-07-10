// import { PropType } from 'vue'

export const subClassesDesign = {
  circle: 'circle'
}

export interface PropsDesignInterface {
  linear?: boolean,
  circular?: boolean,
  indeterminate?: 'type1' | 'type2',
  position?: 'top' | 'bottom',
  dense?: boolean,
  inverse?: boolean
}
export const defaultsDesign = {
  linear: true,
  indeterminate: 'type1',
  position: 'top'
}

// export const propsDesign = { /* sample */ }
