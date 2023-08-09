import { ConstrItemType } from '../../classes/DesignConstructor'

import { ButtonDesign } from '../Button/ButtonDesign'

import {
  ChipComponentsInterface,
  ChipSetupInterface
} from './types'
import { PropsChipType, subclassesChip } from './props'

/**
 * ChipDesign
 */
export class ChipDesign<
  SETUP extends ChipSetupInterface,
  EXPOSE extends ConstrItemType,
  P extends PropsChipType,
  S extends typeof subclassesChip,
  C extends ChipComponentsInterface
> extends ButtonDesign<
  SETUP,
  EXPOSE,
  P,
  S,
  C
> {
}
