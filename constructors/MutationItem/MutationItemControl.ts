import { Ref, ref } from 'vue'
import { forEach, isFilled } from '../../functions/data'
import { getIdElement } from '../../functions/element'
import { To } from '../../classes/To'

import { KEY_DESIGN, KEY_END, KEY_INIT } from '../Mutation/MutationControl'

export interface MutationItemControlInterface {
  id: string
  name: string
  element: HTMLElement
  binds: Ref<Record<string, any>>
  children: Node[]
}

export type MutationItemControlListType = MutationItemControlInterface[]

const NONE_KEYS: string[] = [
  KEY_DESIGN,
  KEY_INIT,
  KEY_END
]

/**
 * A class for working with data change control for an element
 *
 * Класс для работы с контролем изменения данных у элемента
 */
export class MutationItemControl {
  protected static items: MutationItemControlListType = []
  protected static mutation?: MutationObserver

  /**
   * Adding a new element for registration
   *
   * Добавление нового элемента для регистрации
   * @param element a checked element / проверяемый элемент
   */
  static registration (element: HTMLElement): MutationItemControlInterface {
    const item = this.getItem(element)

    if (item) {
      return item
    } else {
      const newItem: MutationItemControlInterface = {
        id: getIdElement(element),
        name: element.dataset?.init || element.localName,
        element,
        binds: ref(this.getBinds(element)),
        children: [...element.childNodes]
      }

      this.items.push(newItem)

      this.removeChildren(element)
      requestAnimationFrame(() => this.start())

      element.dataset[KEY_END] = 'end'

      return newItem
    }
  }

  /**
   * Stop observing the DOM changes
   *
   * Остановка наблюдения за изменениями DOM
   * @param element a checked element / проверяемый элемент
   */
  static disconnect (element: HTMLElement): void {
    const key = this.items.findIndex(item => item.id === element.id)

    if (key !== -1) {
      this.end()
      this.items.splice(key, 1)

      if (this.items.length > 0) {
        this.start()
      }
    }
  }

  /**
   * Start observing the changes
   *
   * Старт наблюдения за изменениями
   * @protected
   */
  protected static start () {
    if (this.mutation) {
      this.end()
    }

    this.mutation = new MutationObserver(record => this.callback(record))

    this.items.forEach(item => {
      this.mutation?.observe(item.element, {
        attributes: true,
        attributeOldValue: false,
        characterData: false,
        characterDataOldValue: false,
        childList: false,
        subtree: false
      })
    })
  }

  /**
   * Stop observing the DOM changes
   *
   * Остановка наблюдения за изменениями DOM
   * @protected
   */
  protected static end () {
    if (this.mutation) {
      this.mutation.disconnect()
      this.mutation = undefined
    }
  }

  /**
   * Returns an object with information about the element
   *
   * Возвращает объект с информацией об элементе
   * @param element a checked element / проверяемый элемент
   * @protected
   */
  protected static getItem (element: HTMLElement): MutationItemControlInterface | undefined {
    return this.items.find(item => item.id === element.id)
  }

  /**
   * Converts the input value to one of the available types
   *
   * Преобразует входное значение в один из доступных типов
   * @param element input value / входное значение
   * @protected
   */
  protected static getBinds (element: HTMLElement): Record<string, any> {
    const data: Record<string, any> = {}

    forEach<string | undefined, string, void>(element.dataset, (value, index) => {
      if (
        isFilled(value) &&
        NONE_KEYS.indexOf(index) === -1
      ) {
        data[index] = To.transformation(value)
      }
    })

    return data
  }

  /**
   * Removing all child elements of an element
   *
   * Удаление у элемента всех дочерних элементов
   * @param element a checked element / проверяемый элемент
   * @protected
   */
  protected static removeChildren (element: HTMLElement): void {
    element.childNodes.forEach(item => element.removeChild(item))
  }

  /**
   * A method for tracking changes
   *
   * Метод для слежения за изменениями
   * @param record an array of MutationRecord objects / массив объектов MutationRecord
   * @protected
   */
  protected static callback (record: MutationRecord[]) {
    record.forEach(item => {
      if (item.type === 'attributes') {
        this.update(item.target as HTMLElement)
      }
    })
  }

  /**
   * Updating data for an element
   *
   * Обновление данных для элемента
   * @param element a checked element / проверяемый элемент
   * @protected
   */
  protected static update (element: HTMLElement): void {
    const item = this.getItem(element)

    if (item) {
      item.binds.value = this.getBinds(item.element)
    }
  }
}
