'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.MutationItemControl = void 0
const vue_1 = require('vue')
const data_1 = require('../../functions/data')
const element_1 = require('../../functions/element')
const To_1 = require('../../classes/To')
const MutationControl_1 = require('../Mutation/MutationControl')
const NONE_KEYS = [
  MutationControl_1.KEY_DESIGN,
  MutationControl_1.KEY_INIT,
  MutationControl_1.KEY_END
]
/**
 * A class for working with data change control for an element
 *
 * Класс для работы с контролем изменения данных у элемента
 */
class MutationItemControl {
  static items = []
  static mutation
  /**
     * Adding a new element for registration
     *
     * Добавление нового элемента для регистрации
     * @param element a checked element / проверяемый элемент
     */
  static registration (element) {
    const item = this.getItem(element)
    if (item) {
      return item
    } else {
      const newItem = {
        id: (0, element_1.getIdElement)(element),
        name: element.dataset?.init || element.localName,
        element,
        binds: (0, vue_1.ref)(this.getBinds(element)),
        children: this.getChildren(element)
      }
      this.removeChildren(element)
      this.items.push(newItem)
      element.dataset[MutationControl_1.KEY_END] = 'end'
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
  static disconnect (element) {
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
  static start () {
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
     * @param element a checked element / проверяемый элемент
     * @protected
     */
  static getItem (element) {
    return this.items.find(item => item.id === element.id)
  }

  /**
     * Converts the input value to one of the available types
     *
     * Преобразует входное значение в один из доступных типов
     * @param element input value / входное значение
     * @protected
     */
  static getBinds (element) {
    const data = {};
    (0, data_1.forEach)(element.dataset, (value, index) => {
      if (NONE_KEYS.indexOf(index) === -1) {
        data[index] = To_1.To.transformation(value, !!index.match(/^on/i))
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
  static getChildren (element) {
    if (element.innerHTML.trim()) {
      const data = {}
      let isSlot
      for (const item of element.children) {
        const name = item?.dataset?.slot
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
  static getChildrenItem (item) {
    const data = []
    item.childNodes.forEach(child => {
      if (child instanceof HTMLElement) {
        data.push({
          tag: child.nodeName,
          attributes: {
            ...(0, element_1.getAttributes)(child),
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
  static removeChildren (element) {
    element.childNodes.forEach(item => element.removeChild(item))
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
      if (item.type === 'attributes') {
        this.update(item.target)
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
  static update (element) {
    const item = this.getItem(element)
    if (item) {
      item.binds.value = this.getBinds(item.element)
    }
  }
}
exports.MutationItemControl = MutationItemControl
// # sourceMappingURL=MutationItemControl.js.map
