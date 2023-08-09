'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.DesignComponents = void 0
const data_1 = require('../functions/data')
const ref_1 = require('../functions/ref')
const render_1 = require('../functions/render')
/**
 * Class for working with connected components
 *
 * Класс для работы с подключенными компонентами
 */
class DesignComponents {
  components
  modification
  /**
     * Constructor
     * @param components list of connected components / список подключенных компонентов
     * @param modification data for modification / данные для модификации
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (components, modification) {
    this.components = components
    this.modification = modification
  }

  /**
     * Check the presence of the component
     *
     * Проверить наличие компонента
     * @param name name of the component / названия компонента
     */
  is (name) {
    return name in this.components
  }

  /**
     * Getting the object of the component
     *
     * Получение объекта компонента
     * @param name name of the component / названия компонента
     */
  get (name) {
    return this.components?.[name]
  }

  /**
     * Returns the modified input data of the connected components
     *
     * Возвращает модифицированные входные данные у подключенных компонентов
     * @param index the name of this / название данного
     * @param props basic data / базовые данные
     */
  getModification (index, props) {
    if (index &&
            this.modification &&
            this.modification?.[index]) {
      const value = {};
      (0, data_1.forEach)(this.modification[index], (item, name) => {
        value[name] = (0, ref_1.getRef)(item)
      })
      if (props) {
        Object.assign(value, props)
      }
      return value
    } else {
      return props
    }
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
  render (name, props, children, index) {
    if (this.is(name)) {
      return [
        (0, render_1.render)(this.get(name), this.getModification(index, props), children, index || name)
      ]
    }
    return []
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
  renderAdd (item, name, props, children, index) {
    item.push(...this.render(name, props, children, index))
    return this
  }
}
exports.DesignComponents = DesignComponents
// # sourceMappingURL=DesignComponents.js.map
