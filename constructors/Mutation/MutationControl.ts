import { ref, Ref } from 'vue'
import { forEach } from '../../functions/data'
import { To } from '../../classes/To'

export interface MutationControlInterface {
  name: string,
  code: string,
  list: Ref<HTMLElement[]>
}

export interface MutationCollectInterface {
  item: MutationControlInterface
  element: HTMLElement
}

export type MutationControlListType = MutationControlInterface[]
export type MutationCollectListType = MutationCollectInterface[]

const KEY_INIT = 'init'

/**
 * A class for global monitoring of changes and searching for new elements to transform into components
 *
 * Класс для глобального слежения за изменениями и поиска новых элементов для преобразования в компоненты
 */
export class MutationControl {
  protected static items: MutationControlListType = []
  protected static mutation?: MutationObserver

  /**
   * Registration of observation by its name of design
   *
   * Регистрация наблюдения по его имени дизайна
   * @param name names of the design / названия дизайна
   */
  static registration (name: string): MutationControlInterface {
    const item = this.getItem(name)

    if (item) {
      return item
    } else {
      const newItem: MutationControlInterface = {
        name: To.camelCaseFirst(name),
        code: To.kebabCase(name),
        list: ref([])
      }

      this.items.push(newItem)

      this.addList()
      requestAnimationFrame(() => this.start())

      return newItem
    }
  }

  /**
   * Stop observing the DOM changes
   *
   * Остановка наблюдения за изменениями DOM
   * @param name names of the design / названия дизайна
   */
  static disconnect (name: string) {
    const code = To.kebabCase(name)
    const key = this.items.findIndex(item => item.code === code)

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
    this.mutation.observe(document.body, {
      attributes: false,
      attributeOldValue: false,
      characterData: false,
      characterDataOldValue: false,
      childList: true,
      subtree: true
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
   * @param name names of the design / названия дизайна
   * @protected
   */
  protected static getItem (name: string): MutationControlInterface | undefined {
    const code = To.kebabCase(name)
    return this.items.find(item => item.code === code)
  }

  /**
   * Returns an object with information on the element
   *
   * Возвращает объект с информацией по элементу
   * @param element element for verification / элемент для проверки
   * @protected
   */
  protected static getItemByElement (element: Node | HTMLElement): MutationControlInterface | undefined {
    return 'dataset' in element && !(KEY_INIT in element.dataset)
      ? this.items.find(item => item.code in element.dataset)
      : undefined
  }

  /**
   * Returns the names of attributes by the name of the design
   *
   * Возвращает названия атрибутов по названию дизайна
   * @param name names of the design / названия дизайна
   * @protected
   */
  protected static getAttributeByName (name: string): string {
    return `data-${name}`
  }

  /**
   * Returns the names of attributes for the label that the element has already been processed
   *
   * Возвращает названия атрибутов для метки, что элемент уже обработан
   * @protected
   */
  protected static getAttributeInit (): string {
    return `data-${KEY_INIT}`
  }

  /**
   * A list of attributes to watch for
   *
   * Список атрибутов, за которыми надо следить
   * @protected
   */
  protected static getAttributeFilter (): string[] {
    return forEach(this.items, item => this.getAttributeByName(item.code))
  }

  /**
   * Returns the select for searching unprocessed elements by the name of the design
   *
   * Возвращает selector для поиска необработанных элементов по названию дизайна
   * @param name names of the design / названия дизайна
   * @param init searching for initialized elements / искать инициализированных элементов
   * @protected
   */
  protected static getSelectorFindNew (name: string, init = false): string {
    if (init) {
      return `*[${this.getAttributeByName(name)}][${this.getAttributeInit()}]`
    } else {
      return `*[${this.getAttributeByName(name)}]:not([${this.getAttributeInit()}])`
    }
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
      item.addedNodes.forEach(node => this.add(node as HTMLElement))
      item.removedNodes.forEach(node => this.remove(node as HTMLElement))
    })
  }

  /**
   * Initial stage, start of searching for all unprocessed elements
   *
   * Начальный этап, начало поиска всех необработанных элементов
   * @param initial initial element for search / начальный элемент для поиска
   * @param init searching for initialized elements / искать инициализированных элементов
   * @protected
   */
  protected static collect (
    initial: Node | HTMLElement = document.body,
    init = false
  ): MutationCollectListType {
    const data: MutationCollectListType = []

    if ('querySelector' in initial) {
      this.items.forEach(item => {
        const code = this.getSelectorFindNew(item.code, init)

        if (initial.querySelector(code)) {
          initial.querySelectorAll<HTMLElement>(code)
            .forEach(element => {
              data.push({
                item,
                element
              })
            })
        }
      })
    }

    return data
  }

  /**
   * Adding an element and its child elements
   *
   * Добавление элемента и его дочерних элементы
   * @param element element for deletion / элемент для удаления
   * @protected
   */
  protected static async add (element: HTMLElement): Promise<void> {
    this.addItem(this.getItemByElement(element), element)
    this.addList(element)
  }

  /**
   * Adding an element for transformation
   *
   * Добавление элемента для преобразования
   * @param item an object with information / объект с информацией
   * @param element element for deletion / элемент для удаления
   * @protected
   */
  protected static addItem (
    item: MutationControlInterface | undefined,
    element: HTMLElement
  ): void {
    if (
      item &&
      item.list.value.indexOf(element) === -1
    ) {
      item.list.value.push(element)
      element.dataset[KEY_INIT] = KEY_INIT

      console.info('Mutation: add', element)
    }
  }

  /**
   * Adding child elements
   *
   * Добавления дочерних элементы
   * @param initial initial element for search / начальный элемент для поиска
   * @protected
   */
  protected static addList (initial: HTMLElement = document.body): void {
    this.collect(initial).forEach(({
      item,
      element
    }) => this.addItem(item, element))
  }

  /**
   * Removing an element and its child elements from the list
   *
   * Удаление элемента и его дочерних элементов из списка
   * @param element element for deletion / элемент для удаления
   * @protected
   */
  protected static async remove (element: HTMLElement): Promise<void> {
    this.removeItem(this.getItemByElement(element), element)
    this.removeList(element)
  }

  /**
   * Removal of an element from the list
   *
   * Удаление элемента из списка
   * @param item an object with information / объект с информацией
   * @param element element for deletion / элемент для удаления
   * @protected
   */
  protected static removeItem (
    item: MutationControlInterface | undefined,
    element: HTMLElement
  ): void {
    if (item) {
      const key = item.list.value.indexOf(element)

      if (key !== -1) {
        item.list.value.splice(key, 1)

        console.info('Mutation: remove', element)
      }
    }
  }

  /**
   * Removing child elements
   *
   * Удаление дочерних элементов
   * @param initial initial element for search / начальный элемент для поиска
   * @protected
   */
  protected static removeList (initial: HTMLElement = document.body): void {
    this.collect(initial, true).forEach(({
      item,
      element
    }) => this.removeItem(item, element))
  }
}
