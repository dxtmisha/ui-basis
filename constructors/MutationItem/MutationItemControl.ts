import { Ref, ref } from 'vue'
import { forEach } from '../../functions/data'
import { getAttributes, getIdElement } from '../../functions/element'
import { To } from '../../classes/To'

import { KEY_DESIGN, KEY_END, KEY_INIT } from '../Mutation/MutationControl'

export interface MutationItemChildrenInterface {
  tag: string
  attributes?: Record<string, string | null>
}

export type MutationItemChildrenListType = (MutationItemChildrenInterface | string)[]

export interface MutationItemControlInterface {
  id: string
  name: string
  element: HTMLElement
  binds: Ref<Record<string, any>>
  children?: Record<string, MutationItemChildrenListType>
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
        children: this.getChildren(element)
      }

      this.removeChildren(element)
      this.items.push(newItem)

      element.dataset[KEY_END] = 'end'

      requestAnimationFrame(() => this.start())

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
      if (NONE_KEYS.indexOf(index) === -1) {
        data[index] = To.transformation(value, !!index.match(/^on/i))
      }
    })

    return data
  }

  /**
   * Gets the list of available slots
   *
   * Получает список доступных слотов
   * @param element input value / входное значение
   * @protected
   */
  protected static getChildren (element: HTMLElement) {
    if (element.innerHTML.trim()) {
      const data: Record<string, MutationItemChildrenListType> = {}
      let isSlot

      for (const item of element.children) {
        const name = (item as HTMLElement)?.dataset?.slot

        if (name) {
          isSlot = true
          data[name] = this.getChildrenItem(item)
        }
      }

      if (isSlot) {
        return data
      } else {
        return { default: this.getChildrenItem(element) }
      }
    } else {
      return undefined
    }
  }

  /**
   * A class for getting the list of descendants
   *
   * Класс для получения списка потомков
   * @param item an element for checking / элемент для проверки
   * @protected
   */
  protected static getChildrenItem (item: Node) {
    const data: MutationItemChildrenListType = []

    item.childNodes.forEach(child => {
      if (child instanceof HTMLElement) {
        data.push({
          tag: child.nodeName,
          attributes: {
            ...getAttributes(child),
            innerHTML: child?.innerHTML
          }
        })
      } else if (child?.textContent) {
        data.push(child?.textContent)
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
