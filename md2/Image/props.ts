import { DesignPropsPrototypeType } from '../../classes/Design'
import { propsDesign, subClassesDesign } from './props.design'
import { propsImage } from '../../constructors/Image/props'

export const subClasses = {
  ...subClassesDesign

  // Subclass list

}

export const props = {
  ...propsDesign,
  ...propsImage
}

export type propsType = DesignPropsPrototypeType<typeof props>
