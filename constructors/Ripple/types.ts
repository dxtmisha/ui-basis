import {
  DesignEmitsType,
  DesignPropsType,
  DesignPropsValueType
} from '../../classes/Design'

import { PropsRippleType } from './props'

// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
// export interface RippleComponentsInterface {}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
export interface RippleInitInterface {
  onClick: (event: MouseEvent) => void
}

// Type describing subclasses
// Тип, описывающий подклассы
export type RippleSubClassesType = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :subclass
  item: 'item'
  // :subclass
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type RipplePropsValueType = DesignPropsValueType<PropsRippleType>

// Type describing available events
// Тип, описывающий доступные события
export type RippleEmitsType = DesignEmitsType

// Type describing available slots
// Тип, описывающий доступные слоты
export type RippleSlotsType = DesignPropsType
