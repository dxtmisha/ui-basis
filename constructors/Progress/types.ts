import { ComputedRef } from 'vue'

import {
  DesignEmitsType,
  DesignPropsType,
  DesignPropsValueType
} from '../../classes/Design'

import { PropsProgressType } from './props'

// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
// export interface ProgressComponentsInterface {}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
export interface ProgressInitInterface {
  tag: ComputedRef<string>
  valueInPercent: ComputedRef<string | null>
  onAnimation: (event: AnimationEvent) => void
}

// Type describing subclasses
// Тип, описывающий подклассы
export type ProgressSubClassesType = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :subclass
  circle: 'circle'
  // :subclass
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type ProgressPropsValueType = DesignPropsValueType<PropsProgressType>

// Type describing available events
// Тип, описывающий доступные события
export type ProgressEmitsType = DesignEmitsType

// Type describing available slots
// Тип, описывающий доступные слоты
export type ProgressSlotsType = DesignPropsType
