import { ComputedRef } from 'vue'

import { ImageDataType } from './ImageData'

// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
// export interface ImageComponentsInterface {}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
export interface ImageSetupInterface {
  text: ComputedRef<string | undefined>
}

// Type describing available slots
// Тип, описывающий доступные слоты
// export type ImageSlotsType = {}

// Type describing available events
// Тип, описывающий доступные события
export type ImageEmitsType = {
  load: [image: ImageDataType]
}

// Type describing available events
// Тип, описывающий доступные события
export type ImageExposeType = {
  image: ImageDataType
}
