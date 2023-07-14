import { VNode } from 'vue'

import {
  DesignEmitsType,
  DesignPropsType,
  DesignPropsValueType
} from '../../classes/Design'

import { PropsButtonType } from './props'

// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
export interface ButtonComponentsInterface {
  component: object
}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
export interface ButtonInitInterface {
  property: string
}

// Type describing subclasses
// Тип, описывающий подклассы
export type ButtonSubClassesType = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :subclass
  inscription: 'inscription'
  // :subclass
} & {
  // Subclass
  subclass: 'subclass'
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type ButtonPropsValueType = DesignPropsValueType<PropsButtonType>

// Type describing available events
// Тип, описывающий доступные события
export type ButtonEmitsType = DesignEmitsType

// Type describing available slots
// Тип, описывающий доступные слоты
export type ButtonSlotsType = DesignPropsType & {
  default?: () => VNode
}
