import { Ref } from 'vue'

import {
  DesignPropsType,
  DesignPropsValueType
} from '../../classes/Design'

import { PropsMutationType } from './props'
import { PropsMutationItemType } from '../MutationItem/props'

import { MutationControlInterface } from './MutationControl'

// [!] System label, cannot be deleted
// [!] Системная метка, нельзя удалять
// :components-import
// :components-import

// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
export interface MutationComponentsInterface {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :components-include
  // :components-include
  mutationItem: PropsMutationItemType
}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
export interface MutationInitInterface {
  item: Ref<MutationControlInterface | undefined>
  list: Ref<HTMLElement[] | undefined>
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type MutationPropsValueType = DesignPropsValueType<PropsMutationType>

// Type describing available events
// Тип, описывающий доступные события
export type MutationEmitsType = {
  load: [name: string]
}

// Type describing available slots
// Тип, описывающий доступные слоты
export type MutationSlotsType = DesignPropsType
