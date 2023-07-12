import { Ref, VNode } from 'vue'
import { DesignPropsRefsType, DesignPropsType, DesignPropsValueType } from '../../classes/Design'

import { PropsButtonInterface } from './props'

export type ButtonEventType = DesignPropsRefsType & {
  to?: Ref<string>
  value?: Ref<any>
  detail?: Ref<Record<string, any>>
}

export type ButtonEventOptionsType = {
  type: string
  value?: any
  detail?: Record<string, any>
}

export type ButtonDesignSubClassesType = {
  inscription: 'inscription'
}

export type ButtonDesignPropsValueType = DesignPropsValueType<PropsButtonInterface>

export type ButtonDesignEmitsType = {
  click: [
    event: MouseEvent,
    value: ButtonEventOptionsType
  ]
}

export type ButtonDesignSlotsType = DesignPropsType & {
  default?: () => VNode
}
