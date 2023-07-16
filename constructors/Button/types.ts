import { ComputedRef } from 'vue'

import {
  DesignPropsType,
  DesignPropsValueType
} from '../../classes/Design'

import { PropsButtonType } from './props'

import { PropsIconType } from '../Icon/props'
import { PropsProgressType } from '../Progress/props'
import { PropsRippleType } from '../Ripple/props'

// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
export interface ButtonComponentsInterface {
  icon?: PropsIconType
  progress?: PropsProgressType
  ripple?: PropsRippleType
}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
export interface ButtonInitInterface {
  isEnabled: ComputedRef<boolean>
  isInscription: ComputedRef<boolean>

  disabledBind: ComputedRef<boolean | undefined>
  iconBind: ComputedRef<PropsIconType>
  trailingBind: ComputedRef<PropsIconType>

  onClick: (event: MouseEvent) => void
  onTrailing: (event: MouseEvent) => void
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
