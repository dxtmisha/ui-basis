import {
  DesignPropsType,
  DesignPropsValueType
} from '../../classes/Design'

import { PropsMutationItemType } from './props'

// [!] System label, cannot be deleted
// [!] Системная метка, нельзя удалять
// :components-import
// :components-import

// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
// export interface MutationItemComponentsInterface {}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
export interface MutationItemInitInterface {
  tag: string
  binds: Record<string, any>
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type MutationItemPropsValueType = DesignPropsValueType<PropsMutationItemType>

// Type describing available events
// Тип, описывающий доступные события
export type MutationItemEmitsType = {
  load: [name: string]
}

// Type describing available slots
// Тип, описывающий доступные слоты
export type MutationItemSlotsType = DesignPropsType & {
  default? (): any
}
