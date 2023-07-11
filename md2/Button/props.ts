import {
  PropsDesignInterface,
  defaultsDesign,
  // propsDesign,
  subClassesDesign
} from './props.design'
import { PropsButtonInterface, defaultsButton } from '../../constructors/Button/props'

export const subClasses = {
  ...subClassesDesign

  // Subclass list

}

export type PropsInterface = PropsDesignInterface & PropsButtonInterface

export const defaults = {
  ...defaultsDesign,
  ...defaultsButton
}

// export const props = { ...propsDesign }
