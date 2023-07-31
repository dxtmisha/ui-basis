'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.MutationItemDesign = void 0
const vue_1 = require('vue')
const data_1 = require('../../functions/data')
const Design_1 = require('../../classes/Design')
const MutationItemControl_1 = require('./MutationItemControl')
// [!] System label, cannot be deleted
// [!] Системная метка, нельзя удалять
// :components-import
// :components-import
/**
 * MutationItemDesign
 */
class MutationItemDesign extends Design_1.Design {
  item = (0, vue_1.ref)()
  children = (0, vue_1.ref)(undefined)
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :components-variable
  // :components-variable
  /**
     * Method for generating additional properties
     *
     * Метод для генерации дополнительных свойств
     * @protected
     */
  init () {
    (0, vue_1.onBeforeMount)(() => this.collect());
    (0, vue_1.onUnmounted)(() => this.disconnect())
    return {
      item: this.item,
      children: this.children
    }
  }

  /**
     * A method for rendering
     *
     * Метод для рендеринга
     * @protected
     */
  initRender () {
    const children = []
    if (this.item.value) {
      children.push((0, vue_1.h)(vue_1.Teleport, { to: `#${this.item.value.id}` }, [(0, vue_1.h)(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (0, vue_1.resolveComponent)(this.item.value.name), this.item.value.binds, this.children.value)]))
    }
    return (0, vue_1.h)('div', {
      ref: this.element,
      class: this.setupItem?.classes.value.main
    }, children)
  }

  /**
     * A method for generating an object for working with slots
     *
     * Метод для генерации объекта для работы со слотами
     * @param children an object with descendants / объект с потомками
     * @protected
     */
  initChildren (children) {
    if (children) {
      const data = {};
      (0, data_1.forEach)(children, (item, index) => {
        data[index] = (0, vue_1.withCtx)(() => {
          return (0, data_1.forEach)(item, child => {
            return typeof child === 'string' ? child : (0, vue_1.h)(child.tag, child?.attributes)
          })
        })
      })
      return data
    }
    return undefined
  }

  /**
     * Beginning of initialization for tracking and searching the element
     *
     * Начало инициализации за слежения и поиска элемента
     * @protected
     */
  collect () {
    if (this.props.element) {
      this.item.value = MutationItemControl_1.MutationItemControl.registration(this.props.element)
      this.children.value = this.initChildren(this.item.value?.children)
      this.emit('load', this.item.value)
    }
    return this
  }

  /**
     * Termination of observation of changes
     *
     * Прекращения наблюдения за изменения
     * @protected
     */
  disconnect () {
    if (this.props.element) {
      MutationItemControl_1.MutationItemControl.disconnect(this.props.element)
    }
    return this
  }
}
exports.MutationItemDesign = MutationItemDesign
// # sourceMappingURL=MutationItemDesign.js.map
