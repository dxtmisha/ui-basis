'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.DesignComponents = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
const ref_1 = require('../functions/ref')
/**
 * Class for working with connected components
 *
 * Класс для работы с подключенными компонентами
 */
class DesignComponents {
  item = {}
  modification = (0, vue_1.ref)({})
  /**
     * Check the presence of the component
     *
     * Проверить наличие компонента
     * @param name name of the component / названия компонента
     */
  is (name) {
    return name in this.item
  }

  /**
     * Getting the object of the component
     *
     * Получение объекта компонента
     * @param name name of the component / названия компонента
     */
  get (name) {
    return this.item?.[name]
  }

  /**
     * Getting cached, immutable data
     *
     * Получение кешированных, неизменяемых данных
     * @param name name of the component / названия компонента
     * @param props property of the component / свойство компонента
     * @param children sub-elements of the component / под элементы компонента
     * @param index the name of the key / названия ключа
     */
  getNode (name, props, children, index) {
    const code = this.getIndex(name, props, index)
    return (0, vue_1.h)(name, { key: code, ...props }, children)
  }

  /**
     * Returns or generates a new element
     *
     * Возвращает или генерирует новый элемент
     * @param name name of the component / названия компонента
     * @param props property of the component / свойство компонента
     * @param index the name of the key / названия ключа
     * @protected
     */
  getIndex (name, props, index) {
    const className = this.getClassName(props)
    if (index && className) {
      return `${index}.${className}`
    } else if (index) {
      return index
    } else if (className) {
      return className
    } else {
      return name
    }
  }

  /**
     * Returns the name of the class from the property
     *
     * Возвращает название класса из свойства
     * @param props property of the component / свойство компонента
     * @protected
     */
  getClassName (props) {
    return props && 'class' in props && typeof props.class === 'string' ? props.class : undefined
  }

  /**
     * Rendering the component by its name
     *
     * Рендеринг компонента по его имени
     * @param item an array to which the rendered object will be added / массив, по
     * которому будет добавлять объект
     * @param name name of the component / названия компонента
     * @param props property of the component / свойство компонента
     * @param children sub-elements of the component / под элементы компонента
     * @param index the name of the key / названия ключа
     */
  render (item, name, props, children, index) {
    item.push(...this.renderItem(name, props, children, index))
    return this
  }

  /**
     * Rendering a component by its name and returning an array with one component
     *
     * Рендеринг компонента по его имени и возвращение массива с одним компонентом
     * @param name name of the component / названия компонента
     * @param props property of the component / свойство компонента
     * @param children sub-elements of the component / под элементы компонента
     * @param index the name of the key / названия ключа
     */
  renderItem (name, props, children, index) {
    if (this.is(name)) {
      return [
        this.getNode(this.get(name), this.getModification(index, props), children, index || name)
      ]
    }
    return []
  }

  /**
     * Changing the list of connected components
     *
     * Изменение списка подключенных компонентов
     * @param components list of connected components / список подключенных компонентов
     */
  set (components) {
    this.item = components
    return this
  }

  /**
     * Returns the modified input data of the connected components
     *
     * Возвращает модифицированные входные данные у подключенных компонентов
     * @param index the name of this / название данного
     * @param props базовый данный
     */
  getModification (index, props) {
    if (index && index in this.modification.value) {
      const value = {};
      (0, data_1.forEach)(this.modification.value[index], (item, name) => {
        value[name] = (0, ref_1.getRef)((0, data_1.executeFunction)(item))
      })
      return {
        ...value,
        ...(props || {})
      }
    } else {
      return props
    }
  }

  /**
     * Changes data for modification of input data of connected components
     *
     * Изменяет данные для модификации входных данных у подключенных компонентов
     * @param modification data for modification / данные для модификации
     */
  setModification (modification) {
    this.modification.value = modification
    return this
  }
}
exports.DesignComponents = DesignComponents
// # sourceMappingURL=DesignComponents.js.map
