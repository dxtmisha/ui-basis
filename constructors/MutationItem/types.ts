import { Ref } from 'vue'
import { MutationItemControlInterface } from './MutationItemControl'

// Interface for describing what property setup returns<br>
// Интерфейс для описания, какое свойство возвращает setup
export interface MutationItemSetupInterface {
  item: Ref<MutationItemControlInterface | undefined>
  children?: Record<string, any>
}

// Type describing available slots<br>
// Тип, описывающий доступные слоты
// export type MutationItemSlotsType = {
//   default? (props: any): any
// }

// Type describing available events<br>
// Тип, описывающий доступные события
export type MutationItemEmitsType = {
  load: [item: MutationItemControlInterface]
}

// Type describing available properties<br>
// Тип, описывающий доступные свойства
// export interface MutationItemExposeInterface {
//   name: string
// }

// Interface for describing which components need to be connected for work<br>
// Интерфейс для описания, какие компоненты надо подключить для работы
// export interface MutationItemComponentsInterface {
//   component: object
// }
