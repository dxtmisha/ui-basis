import { ComputedRef } from 'vue'

import { ImageDataType } from '../Image/ImageData'

// Interface for describing which components need to be connected for work<br>
// Интерфейс для описания, какие компоненты надо подключить для работы
export interface IconComponentsInterface {
  image?: object
}

// Interface for describing what property setup returns<br>
// Интерфейс для описания, какое свойство возвращает setup
export interface IconSetupInterface {
  iconBind: ComputedRef<Record<string, any>>

  isActive?: ComputedRef<boolean>
  iconActiveBind?: ComputedRef<Record<string, any>>
}

// Type describing available slots<br>
// Тип, описывающий доступные слоты
export type IconSlotsType = {
  default? (): any
}

// Type describing available events<br>
// Тип, описывающий доступные события
export type IconEmitsType = {
  load: [image: ImageDataType]
}

// Type describing available properties<br>
// Тип, описывающий доступные свойства
// export type IconExposeType = {}
