import { ComputedRef } from 'vue'

import {
  DesignPropsType,
  DesignPropsValueType
} from '../../classes/Design'

// import { IconPropsValueType } from '../Icon/types'

import { PropsButtonType } from './props'

// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
export interface ButtonComponentsInterface {
  icon?: object
  progress?: object
  ripple?: object
}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
export interface ButtonInitInterface {
  isEnabled: ComputedRef<boolean>
  isInscription: ComputedRef<boolean>

  disabledBind: ComputedRef<boolean | undefined>
  // iconBind: ComputedRef<IconPropsValueType>
  // trailingBind: ComputedRef<IconPropsValueType>

  onClick: (event: MouseEvent) => void
  onTrailing: (event: MouseEvent) => void
}

// Type describing subclasses
// Тип, описывающий подклассы
export type ButtonSubClassesType = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :subclass
  inscription: 'inscription'
  // :subclass
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type ButtonPropsValueType = DesignPropsValueType<PropsButtonType>

// Parameters for the button event
// Параметры для события кнопка
export type ButtonEventType = {
  type: string
  value?: any
  detail?: Record<string, any>
}

// Type describing available events
// Тип, описывающий доступные события
export type ButtonEmitsType = {
  click: [
    event: MouseEvent,
    value: ButtonEventType
  ]
}

// Type describing available slots
// Тип, описывающий доступные слоты
export type ButtonSlotsType = DesignPropsType & {
  default? (): any
}
