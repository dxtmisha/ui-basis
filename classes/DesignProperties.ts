import { Ref, ref } from 'vue'
import { isFilled } from '../functions/data'

import {
  AnyOrUndefinedType,
  BooleanOrStringType
} from '../constructors/types'

export interface PropertiesStateType {
  index: string,
  name: string,
  value: BooleanOrStringType[]
  state: PropertiesStateType[]
}

export interface PropertiesItemType extends PropertiesStateType {
  type: string,
  className?: string,
  valueAll: BooleanOrStringType[]
  style?: boolean,
  default?: boolean
}

export type PropertiesListType = PropertiesItemType[]

/**
 * A class for working with basic properties from tokens
 *
 * Класс для работы с базовыми свойствами из токенов
 */
export class DesignProperties {
  protected readonly item = ref<PropertiesListType>([])

  /**
   * Returns all properties
   *
   * Возвращает все свойства
   */
  get (): PropertiesListType {
    return this.item.value
  }

  /**
   * Returns a Ref object with all properties
   *
   * Возвращает объект Ref со всеми свойствами
   */
  getItem (): Ref<PropertiesListType> {
    return this.item
  }

  /**
   * Getting a property by its name
   *
   * Получаем свойство по его имени
   * @param name property names / названия свойств
   */
  getByName (name: string): AnyOrUndefinedType<PropertiesItemType> {
    return this.item.value.find(item => item.name === name)
  }

  /**
   * Gets a property by its name or returns the property if the input is the property itself
   *
   * Получает свойство по его имени или возвращает свойство, если на входе является само свойство
   * @param nameItem property names or the property instance itself / названия свойств
   * или сам экземпляр свойства
   */
  getOrItem (
    nameItem: string | PropertiesItemType | PropertiesStateType
  ): AnyOrUndefinedType<PropertiesItemType | PropertiesStateType> {
    return typeof nameItem === 'string'
      ? this.getByName(nameItem)
      : nameItem
  }

  /**
   * Property modification
   *
   * Изменение свойства
   * @param properties list of properties / список свойств
   */
  set (properties: PropertiesListType) {
    if (Array.isArray(properties)) {
      this.item.value = properties
    }

    return this
  }

  isValue (name: string, value: BooleanOrStringType): boolean
  isValue (item: PropertiesItemType | PropertiesStateType, value: BooleanOrStringType): boolean
  /**
   * Checks if the value is a standard property
   *
   * Проверяет, является ли значение стандартным свойством
   * @param nameItem property names or the property instance itself / названия свойств
   * или сам экземпляр свойства
   * @param value property values / значения свойства
   */
  isValue (
    nameItem: string | PropertiesItemType | PropertiesStateType,
    value: BooleanOrStringType
  ): boolean {
    const item = this.getOrItem(nameItem)

    return !!(
      item &&
      isFilled(value) &&
      item?.value?.indexOf(value) !== -1
    )
  }

  isStyle (name: string, value: BooleanOrStringType): boolean
  isStyle (item: PropertiesItemType | PropertiesStateType, value: BooleanOrStringType): boolean
  /**
   * Checks if the property is available for styling
   *
   * Проверяет, доступно ли свойство для применения стиля
   * @param nameItem property names or the property instance itself / названия свойств
   * или сам экземпляр свойства
   * @param value property values / значения свойства
   */
  isStyle (
    nameItem: string | PropertiesItemType | PropertiesStateType,
    value: BooleanOrStringType
  ): boolean {
    const item = this.getOrItem(nameItem)

    return !!(
      item &&
      isFilled(value) &&
      'style' in item &&
      item?.style === true &&
      item?.valueAll?.indexOf(value) === -1
    )
  }

  isBool (name: string): boolean
  isBool (item: PropertiesItemType | PropertiesStateType): boolean
  /**
   * Checks if the property value is true
   *
   * Проверяет, если у свойства значение true
   * @param nameItem property names or the property instance itself / названия свойств
   * или сам экземпляр свойства
   */
  isBool (
    nameItem: string | PropertiesItemType | PropertiesStateType
  ): boolean {
    const item = this.getOrItem(nameItem)

    return !!(
      item &&
      'valueAll' in item &&
      item?.valueAll?.indexOf(true) !== -1
    )
  }
}
