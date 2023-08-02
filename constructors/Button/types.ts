// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
export interface ButtonComponentsInterface {
  component: object
}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
export interface ButtonSetupInterface {
  property: string
}

// Type describing available slots
// Тип, описывающий доступные слоты
export type ButtonSlotsType = {
  default? (): any
}

// Type describing available events
// Тип, описывающий доступные события
export type ButtonEmitsType = {
  load: []
}

// Type describing available events
// Тип, описывающий доступные события
export type ButtonExposeType = {
  name: string
}
