import { ComputedRef } from 'vue'
import { PropsIconType } from '../Icon/props'

import { ButtonEventEmitsType } from './ButtonEvent'
import { ButtonLabelSlotsType } from './ButtonLabel'
import { ButtonIconComponentsType } from './ButtonIcon'
import { ButtonProgressComponentsType } from './ButtonProgress'

// Interface for describing what property setup returns<br>
// Интерфейс для описания, какое свойство возвращает setup
export interface ButtonSetupInterface {
  isEnabled: ComputedRef<boolean>
  disabledBind: ComputedRef<boolean | undefined>
  onClick: (event: MouseEvent) => void

  isLabel?: ComputedRef<boolean>

  iconBind?: ComputedRef<PropsIconType>
  trailingBind?: ComputedRef<PropsIconType>
  onTrailing?: (event: MouseEvent) => void
}

// Type describing available slots<br>
// Тип, описывающий доступные слоты
export type ButtonSlotsType = ButtonLabelSlotsType

// Type describing available events<br>
// Тип, описывающий доступные события
export type ButtonEmitsType = ButtonEventEmitsType

// Type describing available properties<br>
// Тип, описывающий доступные свойства
// export interface ButtonExposeInterface {
//   name: string
// }

// Interface for describing which components need to be connected for work<br>
// Интерфейс для описания, какие компоненты надо подключить для работы
export type ButtonComponentsType = ButtonIconComponentsType
  & ButtonProgressComponentsType
  & {
  ripple?: object
}
