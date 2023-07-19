import { ClassesSubClassesType } from '../../classes/DesignClasses'

import { subClassesFab } from './props'

import { FabPropsValueType } from './types'

import { ButtonDesign } from '../Button/ButtonDesign'

/**
 * FabDesign
 */
export class FabDesign<
  C extends ClassesSubClassesType = typeof subClassesFab,
  P extends FabPropsValueType = FabPropsValueType
> extends ButtonDesign<C, P> {
}
