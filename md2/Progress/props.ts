import {
  PropsDesignInterface,
  defaultsDesign,
  // propsDesign,
  subClassesDesign
} from './props.design'
import { PropsProgressInterface, defaultsProgress } from '../../constructors/Progress/props'

export const subClasses = {
  ...subClassesDesign

  // Subclass list

}

export type PropsInterface = PropsDesignInterface & PropsProgressInterface

export const defaults = {
  ...defaultsDesign,
  ...defaultsProgress
}

// export const props = { ...propsDesign }
