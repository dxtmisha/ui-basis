/**
 * Division by types
 *
 * Разделения на типы
 */
export type UndefinedType = null | undefined
export type EmptyType = UndefinedType | '' | 'undefined' | 0 | false | []
export type AnyOrUndefinedType<T = any> = T | UndefinedType
export type NumberOrUndefinedType = number | UndefinedType
export type NumberOrStringType = number | string
export type BooleanOrNumberOrStringType = boolean | NumberOrStringType
export type BooleanOrStringType = boolean | string
export type NumberOrStringOrDateType = NumberOrStringType | Date

/**
 * Types of functions
 *
 * Типы функций
 */
export type CallbackType<T = any, R = any> = (value: T) => R
export type CallbackVoidType<T = any> = (value: T) => void
export type CallbackNullType<R = void> = () => R

export type CallbackOrAnyType<R = any> = CallbackNullType<R> | R
export type CallbackOrBooleanType = CallbackOrAnyType<boolean>
export type CallbackOrNumberType = CallbackOrAnyType<number>
export type CallbackOrStringType = CallbackOrAnyType<string>

/**
 * Associative array
 *
 * Ассоциативный массив
 */
export interface AssociativeType<T = any> {
  [key: NumberOrStringType]: T
}

export type AssociativeStringType = AssociativeType<string>

export type AssociativeOrAnyType<T = any> = AssociativeType<T> | T
export type AssociativeOrArrayType<T = any> = T[] | AssociativeType<T> | object
export type AssociativeOrMapOrArrayType<T = any> = T[] | Map<T, string> | AssociativeType<T> | object
export type AssociativeOrStringType = AssociativeOrAnyType<string>

export interface ItemType<T = any> {
  text: string
  value: T
}

/**
 * Types for working with home elements
 *
 * Типы для работы с элементами дома
 */
export type ElementType = Window | HTMLElement | Element
export type ElementOrUndefinedType = ElementType | UndefinedType
export type ElementOrStringType = ElementType | string
export type ElementOptionsItemType = CallbackOrAnyType
export type ElementOptionsType =
  CallbackVoidType<ElementType>
  | AssociativeType<ElementOptionsItemType>
  | undefined

export interface coordinatorType {
  x: number,
  y: number
}
