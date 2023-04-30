import { executeFunction, forEach, isFilled } from './data'

import {
  ElementOptionsType,
  ElementOrStringType,
  ElementOrUndefinedType
} from '../constructors/types'

/**
 * Returns the first Element in the document that matches the specified selector or the element
 *
 * Возвращает первый Element документа, который соответствует указанному селектору или саму element
 * @param element selectors for matching or an Element / селекторов для сопоставления или Element
 */
export function getElement (element?: ElementOrStringType): ElementOrUndefinedType {
  return typeof element === 'string' ? (document.querySelector(element) || undefined) : element
}

/**
 * Counter generator of ID number of element
 *
 * Счетчик генератор номера ID элемента
 */
let ids = 1 as number

/**
 * Returns the identifier (ID) of the element or creates it if the element has no ID
 *
 * Возвращает идентификатор (ID) элемента или создает его, если у элемента нет ID
 * @param element Element
 * @param selector selectors for matching / селекторов для сопоставления
 */
export function getIdElement (element?: HTMLElement, selector?: string): string {
  if (element) {
    if (!isFilled(element.id)) {
      element.setAttribute('id', `id-${ids++}`)
    }

    return selector ? `#${element.id}${selector}`.trim() : element.id
  } else {
    return (ids++).toString()
  }
}

/**
 * In an HTML document
 *
 * В HTML-документах создаёт элемент c тем тегом, что указан в аргументе
 * @param parentElement the DOM node's parent Element / родитель для нового элемента
 * @param tagName A string that specifies the type of element to be created / строка,
 * указывающая элемент какого типа должен быть создан
 * @param options an object with attributes or a function for processing an element / объект
 * с атрибутами или функция для обработки элемента
 * @param referenceElement the node before which newNode is inserted / элемент, перед
 * которым будет вставлен newElement
 */
export function createElement<T = HTMLElement> (
  parentElement?: HTMLElement,
  tagName = 'div' as string,
  options?: ElementOptionsType,
  referenceElement?: HTMLElement
): T {
  const element = document.createElement(tagName)

  if (typeof options === 'function') {
    options(element)
  } else if (typeof options === 'object') {
    forEach(options, (value, key) => {
      if (isFilled(value)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        element[key] = executeFunction(value)
      }
    })
  }

  parentElement?.insertBefore(element, referenceElement || null)

  return element as T
}
