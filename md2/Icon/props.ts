import { DesignPropsPrototypeType } from '../../classes/Design'
import { propsDesign, subClassesDesign } from './props.design'
import { propsIcon } from '../../constructors/Icon/props'

export const subClasses = {
  ...subClassesDesign

  // Subclass list

}

export const props = {
  ...propsDesign,
  ...propsIcon
}

export type propsType = DesignPropsPrototypeType<typeof props>

interface test2 {
  a: string,
  b: string
}

interface test3 {
  d: string,
  f: string
}

export interface pTest extends test2, test3 {
  // asd
}
