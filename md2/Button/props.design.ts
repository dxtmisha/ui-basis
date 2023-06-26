import { PropType } from 'vue'

export const subClassesDesign = { /* classes */ }

export const propsDesign = {
  width: {
    type: [String] as PropType<'custom' | string>
  },
  height: {
    type: [Boolean, String] as PropType<'sm' | 'md' | 'lg' | 'custom' | true | 'xl' | string>
  },
  font: {
    type: [String] as PropType<'overline' | 'caption' | 'button' | 'body2' | 'body1' | 'subtitle2' | 'subtitle1' | 'headline6' | 'headline5' | 'headline4' | 'headline3' | 'headline2' | 'headline1' | 'interactive-display'>
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
