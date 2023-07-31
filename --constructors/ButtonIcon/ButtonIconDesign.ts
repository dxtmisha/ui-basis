import { ClassesSubClassesType } from '../../classes/DesignClasses'
import { ButtonDesign } from '../Button/ButtonDesign'

import { subClassesButtonIcon } from './props'

import { ButtonIconPropsValueType } from './types'

/**
 * ButtonIconDesign
 */
export class ButtonIconDesign<
  C extends ClassesSubClassesType = typeof subClassesButtonIcon,
  P extends ButtonIconPropsValueType = ButtonIconPropsValueType
> extends ButtonDesign<C, P> {

}
