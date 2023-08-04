import { ComputedRef } from 'vue'

import { ImageDataType } from './ImageData'

// Interface for describing which components need to be connected for work<br>
// Интерфейс для описания, какие компоненты надо подключить для работы
// export interface ImageComponentsInterface {}

// Interface for describing what property setup returns<br>
// Интерфейс для описания, какое свойство возвращает setup
export interface ImageSetupInterface {
  text: ComputedRef<string | undefined>
}

// Type describing available slots<br>
// Тип, описывающий доступные слоты
// export type ImageSlotsType = {}

// Type describing available events<br>
// Тип, описывающий доступные события
export type ImageEmitsType = {
  load: [image: ImageDataType]
}

// Type describing available properties<br>
// Тип, описывающий доступные свойства
export type ImageExposeType = {
  image: ImageDataType
}
