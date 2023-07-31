import { isFilled } from '../functions/data'

import { AnyOrUndefinedType, BooleanOrStringType } from '../constructors/types'

export type PropertiesStateType = {
  index: string
  name: string
  value: (string | boolean)[]
  state: PropertiesStateType[]
}

export type PropertiesMapType = {
  index: string
  name: string
  type: 'property' | 'subclass' | 'link-class'
  className?: string
  value: (string | boolean)[]
  valueAll: (string | boolean)[]
  state: PropertiesStateType[]
  style?: boolean
  default?: boolean
  category?: string
}

export type PropertiesMixinType = PropertiesStateType | PropertiesMapType
export type PropertiesMapListType = PropertiesMapType[]

const EXCEPTIONS = [
  'focus',
  'readonly',
  'disabled'
]

/**
 * A class for working with basic properties from tokens
 *
 * Класс для работы с базовыми свойствами из токенов
 */
export class DesignProperties {
  /**
   * Constructor
   * @param map list of available properties / список доступных свойств
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly map: PropertiesMapListType
  ) {
  }

  /**
   * Returns all properties
   *
   * Возвращает все свойства
   */
  get (): PropertiesMapListType {
    return this.map
  }

  /**
   * Getting a property by its name
   *
   * Получаем свойство по его имени
   * @param name property names / названия свойств
   */
  getByName (name: string): AnyOrUndefinedType<PropertiesMapType> {
    return this.map.find(item => item.name === name)
  }

  /**
   * Gets a property by its name or returns the property if the input is the property itself
   *
   * Получает свойство по его имени или возвращает свойство, если на входе является само свойство
   * @param nameItem property names or the property instance itself / названия свойств
   * или сам экземпляр свойства
   */
  getOrItem (nameItem: string | PropertiesMixinType): AnyOrUndefinedType<PropertiesMixinType> {
    return typeof nameItem === 'string' ? this.getByName(nameItem) : nameItem
  }

  isBool (name: string): boolean
  isBool (item: PropertiesMixinType): boolean
  /**
   * Checks if the property value is true
   *
   * Проверяет, если у свойства значение true
   * @param nameItem property names or the property instance itself / названия свойств
   * или сам экземпляр свойства
   */
  isBool (nameItem: string | PropertiesMixinType): boolean {
    const item = this.getOrItem(nameItem)

    return !!(
      item &&
      'valueAll' in item &&
      item?.valueAll?.indexOf(true) !== -1
    )
  }

  isValue (name: string, value: BooleanOrStringType): boolean
  isValue (item: PropertiesMixinType, value: BooleanOrStringType): boolean
  /**
   * Checks if the value is a standard property
   *
   * Проверяет, является ли значение стандартным свойством
   * @param nameItem property names or the property instance itself / названия свойств
   * или сам экземпляр свойства
   * @param value property values / значения свойства
   */
  isValue (
    nameItem: string | PropertiesMixinType,
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
  isStyle (item: PropertiesMixinType, value: BooleanOrStringType): boolean
  /**
   * Checks if the property is available for styling
   *
   * Проверяет, доступно ли свойство для применения стиля
   * @param nameItem property names or the property instance itself / названия свойств
   * или сам экземпляр свойства
   * @param value property values / значения свойства
   */
  isStyle (
    nameItem: string | PropertiesMixinType,
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

  isDefault (name: string): boolean
  isDefault (item: PropertiesMixinType): boolean
  /**
   * Checks if the property has a default value
   *
   * Проверяет, есть ли у свойства значение по умолчанию
   * @param nameItem property names or the property instance itself / названия свойств
   * или сам экземпляр свойства
   */
  isDefault (nameItem: string | PropertiesMixinType) {
    const item = this.getOrItem(nameItem)

    return !!(
      item &&
      'default' in item &&
      item.default
    )
  }

  isExceptions (name: string, value: BooleanOrStringType): boolean
  isExceptions (item: PropertiesMixinType, value: BooleanOrStringType): boolean
  /**
   * This checks if an exception belongs to a rule
   *
   * Проверяет, является ли исключение из правила
   * @param nameItem property names or the property instance itself / названия свойств
   * или сам экземпляр свойства
   * @param value property values / значения свойства
   */
  isExceptions (
    nameItem: string | PropertiesMixinType,
    value: BooleanOrStringType
  ): boolean {
    const item = this.getOrItem(nameItem)

    return !!(
      item &&
      value === true &&
      EXCEPTIONS.indexOf(item?.name) !== -1
    )
  }

  getCategoryName (name: string): string | undefined
  getCategoryName (item: PropertiesMixinType): string | undefined
  /**
   * Returns the category name of the property
   *
   * Возвращает название категории у свойства
   * @param nameItem property names or the property instance itself / названия свойств
   * или сам экземпляр свойства
   */
  getCategoryName (nameItem: string | PropertiesMixinType): string | undefined {
    const item = this.getOrItem(nameItem)

    return (item && 'category' in item) ? item.category : undefined
  }

  /**
   * Returns a list of properties by category
   *
   * Возвращает список свойств по категории
   * @param category category name / название категории
   */
  getByCategory (category: string): PropertiesMapListType {
    return this.map.filter(item => item?.category === category)
  }
}
