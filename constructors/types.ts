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
export type NumberOrStringOrDateType = NumberOrStringType | Date
