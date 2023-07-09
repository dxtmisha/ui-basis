import {
  PropsDesignInterface,
  defaultsDesign,
  // propsDesign,
  subClassesDesign
} from './props.design'
import { PropsIconInterface, defaultsIcon } from '../../constructors/Icon/props'

export const subClasses = {
  ...subClassesDesign

  // Subclass list

}

export type PropsInterface = PropsDesignInterface & PropsIconInterface

export const defaults = {
  ...defaultsDesign,
  ...defaultsIcon
}

// export const props = { ...propsDesign }
