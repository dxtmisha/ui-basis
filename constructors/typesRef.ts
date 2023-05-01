import { ComputedRef, Ref } from 'vue'
import { AssociativeType, CallbackNullType, ElementType } from './types'

/**
 * Basic types for working with reactive data
 *
 * Базовый типы для работа с реактивный данными
 */
export type RefType<T = any> = ComputedRef<T> | Ref<T>
export type RefAssociativeType<T = any> = AssociativeType<Ref<T>>
export type RefOrNormalType<T = any> = RefType<T> | T
export type RefOrCallbackType<T = any> = RefType<T> | CallbackNullType<T>
export type RefOrCallbackOrNormalType<T = any> = RefOrCallbackType<T> | T
export type RefOrStringType = RefOrNormalType<string>
export type RefOrElementType<T = ElementType> = RefOrNormalType<T>
