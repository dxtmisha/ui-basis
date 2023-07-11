// import { PropType } from 'vue'

export const subClassesDesign = {
  inscription: 'inscription'
}

export interface PropsDesignInterface {
  height?: string | 'sm' | 'md' | 'lg' | 'custom',
  contained?: boolean,
  disabled?: boolean,
  align?: 'left' | 'right' | 'center'
}
export const defaultsDesign = {
  height: 'md',
  contained: true
}

// export const propsDesign = { /* sample */ }
