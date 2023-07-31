import {
  DesignPropsType,
  DesignPropsValueType
} from '../../classes/Design'

import { ButtonEmitsType } from '../Button/types'

import { PropsButtonIconType } from './props'

// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
// export interface ButtonIconComponentsInterface {}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
// export interface ButtonIconInitInterface {}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type ButtonIconPropsValueType = DesignPropsValueType<PropsButtonIconType>

// Type describing available events
// Тип, описывающий доступные события
export type ButtonIconEmitsType = ButtonEmitsType

// Type describing available slots
// Тип, описывающий доступные слоты
export type ButtonIconSlotsType = DesignPropsType
