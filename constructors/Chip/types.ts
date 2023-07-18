import {
  DesignPropsType,
  DesignPropsValueType
} from '../../classes/Design'

import { ButtonEmitsType } from '../Button/types'

import { PropsChipType } from './props'

// [!] System label, cannot be deleted
// [!] Системная метка, нельзя удалять
// :components-import
// :components-import

// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
export interface ChipComponentsInterface {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :components-include
  // :components-include
  component: object
}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
export interface ChipInitInterface {
  property: string
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type ChipPropsValueType = DesignPropsValueType<PropsChipType>

// Type describing available events
// Тип, описывающий доступные события
export type ChipEmitsType = ButtonEmitsType

// Type describing available slots
// Тип, описывающий доступные слоты
export type ChipSlotsType = DesignPropsType
