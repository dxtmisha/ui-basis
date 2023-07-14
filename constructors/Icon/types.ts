import { ComputedRef, VNode } from 'vue'

import {
  DesignPropsType,
  DesignPropsValueType
} from '../../classes/Design'

import { PropsIconType } from './props'

// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
export interface IconComponentsInterface {
  image?: object
}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
export interface IconInitInterface {
  isActive: ComputedRef<boolean>
  iconBind: ComputedRef<Record<string, any>>
  iconActiveBind: ComputedRef<Record<string, any>>
}

// Type describing subclasses
// Тип, описывающий подклассы
export type IconSubClassesType = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :subclass
  // :subclass
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type IconPropsValueType = DesignPropsValueType<PropsIconType>

// Type describing available events
// Тип, описывающий доступные события
export type IconEmitsType = {
  load: [value: any]
}

// Type describing available slots
// Тип, описывающий доступные слоты
export type IconSlotsType = DesignPropsType & {
  default?: () => VNode
}
