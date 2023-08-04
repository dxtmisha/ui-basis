// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
export interface ImageComponentsInterface {
  component: object
}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
export interface ImageSetupInterface {
  property: string
}

// Type describing available slots
// Тип, описывающий доступные слоты
export type ImageSlotsType = {
  default? (): any
}

// Type describing available events
// Тип, описывающий доступные события
export type ImageEmitsType = {
  load: []
}

// Type describing available events
// Тип, описывающий доступные события
export type ImageExposeType = {
  name: string
}
