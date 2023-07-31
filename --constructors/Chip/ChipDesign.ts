import { ClassesSubClassesType } from '../../classes/DesignClasses'

import { subClassesChip } from './props'

import { ChipPropsValueType } from './types'

import { ButtonDesign } from '../Button/ButtonDesign'

/**
 * ChipDesign
 */
export class ChipDesign<
  C extends ClassesSubClassesType = typeof subClassesChip,
  P extends ChipPropsValueType = ChipPropsValueType
> extends ButtonDesign<C, P> {
}
