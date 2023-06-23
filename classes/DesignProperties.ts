import { Ref, ref } from 'vue'

import {
  AnyOrUndefinedType,
  BooleanOrStringType
} from '../constructors/types'
import { isFilled } from '../functions/data'

export interface PropertiesItemType {
  index: string,
  name: string,
  value: BooleanOrStringType[],
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

  isValue (name: string, value: BooleanOrStringType): boolean {
    const item = this.getByName(name)

    return !!(
      item &&
      isFilled(value) &&
      item?.value?.indexOf(value) !== -1
    )
  }

  isStyle (name: string, value: BooleanOrStringType) {
    const item = this.getByName(name)

    return !!(
      item &&
      isFilled(value) &&
      item?.style &&
      item?.value?.indexOf(true) !== -1
    )
  }

  isBool (name: string): boolean {
    return this.isValue(name, true)
  }
}
