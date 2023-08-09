import { ButtonComponentsType, ButtonEmitsType, ButtonSetupInterface, ButtonSlotsType } from '../Button/types'

// Interface for describing what property setup returns<br>
// Интерфейс для описания, какое свойство возвращает setup
export interface ChipSetupInterface extends ButtonSetupInterface {
}

// Type describing available slots<br>
// Тип, описывающий доступные слоты
export type ChipSlotsType = ButtonSlotsType

// Type describing available events<br>
// Тип, описывающий доступные события
export type ChipEmitsType = ButtonEmitsType

// Type describing available properties<br>
// Тип, описывающий доступные свойства
// export interface ChipExposeInterface {
//   name: string
// }

// Interface for describing which components need to be connected for work<br>
// Интерфейс для описания, какие компоненты надо подключить для работы
export interface ChipComponentsInterface extends ButtonComponentsType {
}
