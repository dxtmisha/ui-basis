import { DesignPropsPrototypeType } from '../../classes/Design'
import { propsDesign, subClassesDesign } from './props.design'
import { propsRipple } from '../../constructors/Ripple/props'

export const subClasses = {
  ...subClassesDesign

  // Subclass list

}

export const props = {
  ...propsDesign,
  ...propsRipple
}

export type propsType = DesignPropsPrototypeType<typeof props>
