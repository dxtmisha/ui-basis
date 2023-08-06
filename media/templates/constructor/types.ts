// Interface for describing which components need to be connected for work<br>
// Интерфейс для описания, какие компоненты надо подключить для работы
export interface ConstructorComponentsInterface {
  component: object
}

// Interface for describing what property setup returns<br>
// Интерфейс для описания, какое свойство возвращает setup
export interface ConstructorSetupInterface {
  property: string
}

// Type describing available slots<br>
// Тип, описывающий доступные слоты
export type ConstructorSlotsType = {
  default? (props: any): any
}

// Type describing available events<br>
// Тип, описывающий доступные события
export type ConstructorEmitsType = {
  load: []
}

// Type describing available properties<br>
// Тип, описывающий доступные свойства
export type ConstructorExposeType = {
  name: string
}
