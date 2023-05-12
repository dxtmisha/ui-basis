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
    public readonly element?: ElementRefType<E>
  ) {
  }

  public readonly item = computed<ElementItemType<E>>(() => {
    const selector = getRef(this.element)

    return this.findElement(selector)
  })

  get (): ElementItemType<E> {
    return this.item.value
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
  private findElement (element?: E | string): E {
    return (typeof element === 'string' ? document.querySelector(element) as E : element) || document.body as E
  }
}
