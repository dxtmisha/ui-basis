import { executeFunction, forEach, isFilled, random } from './data'

import {
  ElementOptionsItemType,
  ElementOptionsType,
  ElementOrStringType,
  ElementOrUndefinedType, ElementType,
  NumberOrStringType
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
export let ids = random(100000, 900000) as number

/**
 * Returns the identifier (ID) of the element or creates it if the element has no ID
 *
 * Возвращает идентификатор (ID) элемента или создает его, если у элемента нет ID
 * @param element element from which you obtain an ID / элемент, с которого получаете ID
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
 * Returns the value of an element by its key
 *
 * Возвращает значение элемента по его ключу
 * @param element checked element / проверяемый элемент
 * @param index index at which we retrieve values / индекс, по которому получаем значения
 * @param defaultValue returns this parameter if the value is missing / возвращает этот параметр,
 * если значение отсутствует
 */
export function getItemElementByIndex<T extends ElementType = HTMLElement, R = any> (
  element: T,
  index: NumberOrStringType,
  defaultValue?: R
): R {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return element?.[index] || defaultValue
}

/**
 * Modifies the value of an element identified by its key
 *
 * Изменяет значение элемента, определенного ключом
 * @param element checked element / проверяемый элемент
 * @param index index at which we retrieve values / индекс, по которому получаем значения
 * @param value new value / новое значение
 */
export function setItemElementByIndex<T extends ElementType = HTMLElement> (
  element: T,
  index: NumberOrStringType,
  value: ElementOptionsItemType
): void {
  const data = getItemElementByIndex(element, index)

  if (
    data &&
    typeof data === 'object' &&
    typeof value === 'object'
  ) {
    forEach(value, (item, key) => {
      data[key] = executeFunction(item)
    })
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element[index] = executeFunction(value)
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
export function createElement<T extends ElementType = HTMLElement> (
  parentElement?: HTMLElement,
  tagName = 'div' as string,
  options?: ElementOptionsType<T>,
  referenceElement?: HTMLElement
): T {
  const element = document.createElement(tagName) as T

  if (typeof options === 'function') {
    options(element)
  } else if (typeof options === 'object') {
    forEach(options, (value, key) => {
      setItemElementByIndex(element, key, value)
    })
  }

  parentElement?.insertBefore(element as HTMLElement, referenceElement || null)

  return element as T
}

/**
 * Cyclically calls requestAnimationFrame until next returns true
 * The window.requestAnimationFrame() method tells the browser that you wish to perform
 * an animation and requests that the browser calls a specified function to update an
 * animation right before the next repaint
 *
 * Циклически вызывает requestAnimationFrame, пока next возвращает true
 * window.requestAnimationFrame указывает браузеру на то, что вы хотите произвести
 * анимацию, и просит его запланировать перерисовку на следующем кадре анимации
 * @param callback the function to call when it's time to update your animation for
 * the next repaint / функция, которая будет вызвана, когда придёт время обновить
 * вашу анимацию на следующей перерисовке
 * @param next function that determines repetition / функция, которая определяет повторность
 * @param end function that is executed if the animation stops / функция, которая
 * выполняется, если останавливается анимация
 */
export function frame (
  callback: () => void,
  next = (() => false) as () => boolean,
  end?: () => void
) {
  requestAnimationFrame(() => {
    callback()

    if (next()) {
      frame(callback, next, end)
    } else if (end) {
      end()
    }
  })
}
