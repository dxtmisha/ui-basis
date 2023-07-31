'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.MutationControl = exports.KEY_END = exports.KEY_INIT = exports.KEY_DESIGN = void 0
const vue_1 = require('vue')
const data_1 = require('../../functions/data')
const To_1 = require('../../classes/To')
exports.KEY_DESIGN = 'design'
exports.KEY_INIT = 'init'
exports.KEY_END = 'end'
/**
 * A class for global monitoring of changes and searching for new elements to transform into components
 *
 * Класс для глобального слежения за изменениями и поиска новых элементов для преобразования в компоненты
 */
class MutationControl {
  static items = []
  static mutation
  /**
     * Registration of observation by its name of design
     *
     * Регистрация наблюдения по его имени дизайна
     * @param name names of the design / названия дизайна
     */
  static registration (name) {
    const item = this.getItem(name)
    if (item) {
      return item
    } else {
      const newItem = {
        name: To_1.To.camelCaseFirst(name),
        code: To_1.To.kebabCase(name),
        list: (0, vue_1.ref)([])
      }
      this.items.push(newItem)
      this.addList()
      this.start()
      return newItem
    }
  }

  /**
     * Stop observing the DOM changes
     *
     * Остановка наблюдения за изменениями DOM
     * @param name names of the design / названия дизайна
     */
  static disconnect (name) {
    const code = To_1.To.kebabCase(name)
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
  static start () {
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
  static end () {
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
  static getItem (name) {
    const code = To_1.To.kebabCase(name)
    return this.items.find(item => item.code === code)
  }

  /**
     * Returns an object with information on the element
     *
     * Возвращает объект с информацией по элементу
     * @param element element for verification / элемент для проверки
     * @param init searching for initialized elements / искать инициализированных элементов
     * @protected
     */
  static getItemByElement (element, init = false) {
    return 'dataset' in element && (init || !(exports.KEY_INIT in element.dataset))
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
  static getAttributeByName (name) {
    return `data-${name}`
  }

  /**
     * Returns the names of attributes for the label that the element has already been processed
     *
     * Возвращает названия атрибутов для метки, что элемент уже обработан
     * @protected
     */
  static getAttributeInit () {
    return `data-${exports.KEY_INIT}`
  }

  /**
     * Returns the names of attributes for the label that the element has already been processed
     *
     * Возвращает названия атрибутов для метки, что элемент уже обработан
     * @protected
     */
  static getAttributeEnd () {
    return `data-${exports.KEY_END}`
  }

  /**
     * A list of attributes to watch for
     *
     * Список атрибутов, за которыми надо следить
     * @protected
     */
  static getAttributeFilter () {
    return (0, data_1.forEach)(this.items, item => this.getAttributeByName(item.code))
  }

  /**
     * Returns the select for searching unprocessed elements by the name of the design
     *
     * Возвращает selector для поиска необработанных элементов по названию дизайна
     * @param name names of the design / названия дизайна
     * @param init searching for initialized elements / искать инициализированных элементов
     * @protected
     */
  static getSelectorFindNew (name, init = false) {
    if (init) {
      return `*[${this.getAttributeByName(name)}][${this.getAttributeInit()}]`
    } else {
      return `*[${this.getAttributeByName(name)}]:not([${this.getAttributeInit()}])`
    }
  }

  /**
     * Returns a selector for finding an element in processing
     *
     * Возвращает селектор для поиска элемента в обработке
     * @protected
     */
  static getSelectorFindInit () {
    return `*[${this.getAttributeInit()}]:not([${this.getAttributeEnd()}])`
  }

  /**
     * A method for tracking changes
     *
     * Метод для слежения за изменениями
     * @param record an array of MutationRecord objects / массив объектов MutationRecord
     * @protected
     */
  static callback (record) {
    record.forEach(item => {
      item.removedNodes.forEach(node => this.remove(node))
      item.addedNodes.forEach(node => this.add(node))
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
  static collect (initial = document.body, init = false) {
    const data = []
    if ('querySelector' in initial) {
      this.items.forEach(item => {
        const code = this.getSelectorFindNew(item.code, init)
        if (initial.querySelector(code)) {
          initial.querySelectorAll(code)
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
  static async add (element) {
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
  static addItem (item, element) {
    if (item &&
            item.list.value.indexOf(element) === -1 &&
            !element.closest(this.getSelectorFindInit())) {
      item.list.value.push(element)
      element.dataset[exports.KEY_DESIGN] = item.code
      element.dataset[exports.KEY_INIT] = `${item.code}-${element.dataset[item.code]}`
      if (process.env.NODE_ENV !== 'production') {
        console.info('Mutation: add', element)
      }
    }
  }

  /**
     * Adding child elements
     *
     * Добавления дочерних элементы
     * @param initial initial element for search / начальный элемент для поиска
     * @protected
     */
  static addList (initial = document.body) {
    this.collect(initial).forEach(({ item, element }) => this.addItem(item, element))
  }

  /**
     * Removing an element and its child elements from the list
     *
     * Удаление элемента и его дочерних элементов из списка
     * @param element element for deletion / элемент для удаления
     * @protected
     */
  static async remove (element) {
    this.removeItem(this.getItemByElement(element, true), element)
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
  static removeItem (item, element) {
    if (item) {
      const key = item.list.value.indexOf(element)
      if (key !== -1) {
        item.list.value.splice(key, 1)
        if (process.env.NODE_ENV !== 'production') {
          console.info('Mutation: remove', element)
        }
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
  static removeList (initial = document.body) {
    this.collect(initial, true).forEach(({ item, element }) => this.removeItem(item, element))
  }
}
exports.MutationControl = MutationControl
// # sourceMappingURL=MutationControl.js.map
