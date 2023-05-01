import { isRef } from 'vue'
import { getElement } from './element'

import { ElementOrStringType, ElementOrUndefinedType } from '../constructors/types'
import { RefOrNormalType } from '../constructors/typesRef'

/**
 * You return the values of the ref variable or the variable itself if it is not reactive
 *
 * Возвращаешь значения ref переменной или саму переменную, если она не реактивная
 * @param item reactive variable or ordinary value / реактивная переменная или обычное значение
 */
export function getRef<T = any> (item: RefOrNormalType<T>): T {
  return isRef(item) ? item.value : item
}

/**
 * Returns the first element within the document that matches the specified selector, or the element
 * itself if it is already an element
 *
 * Возвращает первый элемент документа, который соответствует указанному селектору или сам
 * элемент, если он уже является элементом
 * @param element selectors for matching or an Element / селекторов для сопоставления или Element
 */
export function getElementRef (
  element: RefOrNormalType<ElementOrStringType>
): ElementOrUndefinedType {
  return getElement(getRef(element))
}
