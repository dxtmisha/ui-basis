'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.MutationDesign = void 0
const vue_1 = require('vue')
const element_1 = require('../../functions/element')
const Design_1 = require('../../classes/Design')
const MutationControl_1 = require('./MutationControl')
// [!] System label, cannot be deleted
// [!] Системная метка, нельзя удалять
// :components-import
// :components-import
/**
 * MutationDesign
 */
class MutationDesign extends Design_1.Design {
  props
  item = (0, vue_1.ref)()
  list = (0, vue_1.ref)()
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :components-variable
  // :components-variable
  /**
     * Constructor
     * @param props properties / свойства
     * @param contextEmit additional property / дополнительное свойство
     */
  constructor (props, contextEmit) {
    super(props, contextEmit)
    this.props = props
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :components-init
    // :components-init
  }

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
      list: this.list
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
    this.list.value?.forEach(element => {
      this.components.render(children, 'mutationItem', {
        element,
        onLoad: (item) => this.emit('load', item)
      }, undefined, (0, element_1.getIdElement)(element))
    })
    return (0, vue_1.h)('div', {
      ref: this.element,
      class: this.setupItem?.classes.value.main
    }, children)
  }

  /**
     * Beginning of initialization for tracking and searching the element
     *
     * Начало инициализации за слежения и поиска элемента
     * @protected
     */
  collect () {
    this.item.value = MutationControl_1.MutationControl.registration(this.getNameDesign())
    if (this.item.value) {
      (0, vue_1.watch)(this.item.value?.list, list => {
        this.list.value = [...list]
      }, { immediate: true })
    }
  }

  /**
     * Termination of observation of changes
     *
     * Прекращения наблюдения за изменения
     * @protected
     */
  disconnect () {
    MutationControl_1.MutationControl.disconnect(this.getNameDesign())
    return this
  }
}
exports.MutationDesign = MutationDesign
// # sourceMappingURL=MutationDesign.js.map
