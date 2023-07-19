import {
  DesignPropsValueType
} from '../../classes/Design'

import { ButtonEmitsType, ButtonSlotsType } from '../Button/types'

import { PropsFabType } from './props'

// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
// export interface FabComponentsInterface {}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
// export interface FabInitInterface {}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type FabPropsValueType = DesignPropsValueType<PropsFabType>

// Type describing available events
// Тип, описывающий доступные события
export type FabEmitsType = ButtonEmitsType

// Type describing available slots
// Тип, описывающий доступные слоты
export type FabSlotsType = ButtonSlotsType
