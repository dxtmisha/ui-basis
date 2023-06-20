import { computed } from 'vue'
import { getRef } from '../functions/ref'

import { ElementType } from '../constructors/types'
import { RefOrNormalType } from '../constructors/typesRef'

export type ElementItemType<E = ElementType> = E | undefined
export type ElementValueType<E = ElementType> = E | string | undefined
export type ElementRefType<E = ElementType> = RefOrNormalType<ElementValueType<E>>

/**
 * Class for working with elements
 *
 * Класс для работы с элементами
 */
export class ElementItem<E = ElementType> {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public readonly element?: ElementRefType<E>,
    public readonly elementDefault?: ElementItemType<E>
  ) {
  }

  public readonly item = computed<ElementItemType<E>>(
    () => this.find(getRef(this.element)) || this.getBody()
  )

  /**
   * Checking if an element is still in the DOM
   *
   * Проверка, находится ли элемент еще в DOM
   */
  isDom (): boolean {
    if (this.item.value === window) {
      return true
    } else {
      return !!(this.item.value as HTMLElement)?.closest('html')
    }
  }

  /**
   * Returning an element
   *
   * Возвращение элемента
   */
  get (): ElementItemType<E> {
    return this.item.value
  }

  /**
   * If the element is a window object, returns the body object, otherwise returns
   * the element itself
   *
   * Если элемент является объектом window, возвращает объект body, в противном
   * случае возвращает сам элемент
   */
  getNotWindow (): Exclude<E, Window> {
    return (this.item.value === window ? this.getBody() : this.item.value) as Exclude<E, Window>
  }

  /**
   * The method of the Element interface returns the first element that is a descendant
   * of the element on which it is invoked that matches the specified group of selectors
   *
   * Метод интерфейса Element возвращает первый элемент, который является потомком элемента,
   * на котором он вызывается, и соответствует указанной группе селекторов
   * @param element element or string / элемент или строка
   * @private
   */
  private find (element?: E | string): ElementItemType<E> {
    return (typeof element === 'string' ? document.querySelector(element) as ElementItemType<E> : element)
  }

  /**
   * Returns a default element
   *
   * Возвращает элемент по умолчанию
   * @private
   */
  private getBody (): ElementItemType<E> {
    return this.elementDefault
  }
}
