import {
  DesignEmitsType,
  DesignPropsType,
  DesignPropsValueType
} from '../../../classes/Design'

import { PropsConstructorType } from './props'

// [!] System label, cannot be deleted
// [!] Системная метка, нельзя удалять
// :components-import
// :components-import

// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
export interface ConstructorComponentsInterface {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :components-include
  // :components-include
  component: object
}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
export interface ConstructorInitInterface {
  property: string
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type ConstructorPropsValueType = DesignPropsValueType<PropsConstructorType>

// Type describing available events
// Тип, описывающий доступные события
export type ConstructorEmitsType = DesignEmitsType

// Type describing available slots
// Тип, описывающий доступные слоты
export type ConstructorSlotsType = DesignPropsType & {
  default? (): any
}
