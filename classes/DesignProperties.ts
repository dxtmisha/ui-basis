import { Ref, ref } from 'vue'

import {
  AnyOrUndefinedType,
  BooleanOrStringType
} from '../constructors/types'
import { isFilled } from '../functions/data'

export interface PropertiesStateType {
  index: string,
  name: string,
  value: BooleanOrStringType[]
  state: PropertiesStateType[]
}

export interface PropertiesItemType extends PropertiesStateType {
  style?: boolean,
  default?: boolean
}

export type PropertiesListType = PropertiesItemType[]

export class DesignProperties {
  protected readonly item = ref<PropertiesListType>([])

  get (): PropertiesListType {
    return this.item.value
  }

  getItem (): Ref<PropertiesListType> {
    return this.item
  }

  getByName (name: string): AnyOrUndefinedType<PropertiesItemType> {
    return this.item.value.find(item => item.name === name)
  }

  set (properties: PropertiesListType) {
    if (Array.isArray(properties)) {
      this.item.value = properties
    }

    return this
  }

  isValue (name: string, value: BooleanOrStringType): boolean
  isValue (item: PropertiesItemType | PropertiesStateType, value: BooleanOrStringType): boolean
  isValue (
    nameItem: string | PropertiesItemType | PropertiesStateType,
    value: BooleanOrStringType
  ): boolean {
    const item = typeof nameItem === 'string'
      ? this.getByName(nameItem)
      : nameItem

    return !!(
      item &&
      isFilled(value) &&
      item?.value?.indexOf(value) !== -1
    )
  }

  isStyle (name: string, value: BooleanOrStringType): boolean
  isStyle (item: PropertiesItemType | PropertiesStateType, value: BooleanOrStringType): boolean
  isStyle (
    nameItem: string | PropertiesItemType | PropertiesStateType,
    value: BooleanOrStringType
  ) {
    const item = typeof nameItem === 'string'
      ? this.getByName(nameItem)
      : nameItem

    return !!(
      item &&
      isFilled(value) &&
      (!('style' in item) || item?.style) &&
      item?.value?.indexOf(true) !== -1
    )
  }

  isBool (name: string): boolean {
    return this.isValue(name, true)
  }
}
