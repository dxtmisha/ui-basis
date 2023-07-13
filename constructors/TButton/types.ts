import { VNode } from 'vue'
import { DesignPropsType, DesignPropsValueType } from '../../classes/Design'

import { PropsButtonInterface } from './props'

export interface ButtonDesignComponentsInterface {
  icon?: object
  progress?: object
  ripple?: object
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
