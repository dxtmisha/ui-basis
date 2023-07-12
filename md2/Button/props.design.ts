// import { PropType } from 'vue'

export const subClassesDesign = {
  inscription: 'inscription'
}

export interface PropsDesignInterface {
  height?: string | 'sm' | 'md' | 'lg' | 'custom',
  contained?: boolean,
  rounded?: 'none' | 'standard' | 'sm' | 'md' | 'lg' | 'xl' | 'full',
  disabled?: boolean,
  align?: 'left' | 'right' | 'center'
}
export const defaultsDesign = {
  height: 'md',
  contained: true,
  rounded: 'standard',
  align: 'center'
}

// export const propsDesign = { /* sample */ }
