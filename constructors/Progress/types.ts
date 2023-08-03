import { ComputedRef, Ref } from 'vue'

// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
// export interface ProgressComponentsInterface {}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
export interface ProgressSetupInterface {
  tag: ComputedRef<string>
  hide: Ref<boolean>
  visible: Ref<boolean>
  onAnimation: (event: AnimationEvent) => void

  valueInPercent?: ComputedRef<string | null>
}

// Type describing available slots
// Тип, описывающий доступные слоты
// export type ProgressSlotsType = {}

// Type describing available events
// Тип, описывающий доступные события
// export type ProgressEmitsType = {}

// Type describing available events
// Тип, описывающий доступные события
// export type ProgressExposeType = {}
