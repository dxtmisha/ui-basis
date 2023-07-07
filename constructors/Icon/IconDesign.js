'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.IconDesign = void 0
const vue_1 = require('vue')
const Design_1 = require('../../classes/Design')
/**
 * IconDesign
 */
class IconDesign extends Design_1.Design {
  /**
     * Method for generating additional properties
     *
     * Метод для генерации дополнительных свойств
     * @protected
     */
  init () {
    return {
      property: 'constructor'
    }
  }

  /**
     * A method for rendering
     *
     * Метод для рендеринга
     * @param setup the result of executing the setup method / результат выполнения метода настройки
     * @protected
     */
  initRender (setup) {
    return (0, vue_1.h)('div', {
      ref: this.element,
      class: setup.classes.value.main
    })
  }
}
exports.IconDesign = IconDesign
// # sourceMappingURL=IconDesign.js.map
