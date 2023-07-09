import {
  PropsDesignInterface,
  defaultsDesign,
  // propsDesign,
  subClassesDesign
} from './props.design'
import { PropsImageInterface, defaultsImage } from '../../constructors/Image/props'

export const subClasses = {
  ...subClassesDesign

  // Subclass list

}

export type PropsInterface = PropsDesignInterface & PropsImageInterface

export const defaults = {
  ...defaultsDesign,
  ...defaultsImage
}

// export const props = { ...propsDesign }
