import { Ref } from 'vue'
import { MutationControlInterface } from './MutationControl'
import { MutationItemControlInterface } from '../MutationItem/MutationItemControl'

// Interface for describing what property setup returns<br>
// Интерфейс для описания, какое свойство возвращает setup
export interface MutationSetupInterface {
  item: Ref<MutationControlInterface | undefined>
  list: Ref<HTMLElement[] | undefined>
}

// Type describing available slots<br>
// Тип, описывающий доступные слоты
// export type MutationSlotsType = {
//   default? (props: any): any
// }

// Type describing available events<br>
// Тип, описывающий доступные события
export type MutationEmitsType = {
  load: [item: MutationItemControlInterface]
}

// Type describing available properties<br>
// Тип, описывающий доступные свойства
// export interface MutationExposeInterface {
//   name: string
// }

// Interface for describing which components need to be connected for work<br>
// Интерфейс для описания, какие компоненты надо подключить для работы
export interface MutationComponentsInterface {
  mutationItem: object
}
