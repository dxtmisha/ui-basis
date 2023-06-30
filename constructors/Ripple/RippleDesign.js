'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.RippleDesign = void 0
const element_1 = require('../../functions/element')
const Design_1 = require('../../classes/Design')
class RippleDesign extends Design_1.Design {
  /**
     * Method for generating additional properties
     *
     * Метод для генерации дополнительных свойств
     * @protected
     */
  init () {
    return {
      onClick: (event) => this.addItem(event.offsetX, event.offsetY)
    }
  }

  /**
     * Adding a new light element
     *
     * Добавление нового элемента свечения
     * @param x x-coordinate / x-координата
     * @param y y-coordinate / y-координата
     * @private
     */
  addItem (x, y) {
    if (!this.props.disabled &&
            this.element.value) {
      (0, element_1.createElement)(this.element.value, 'span', item => {
        item.onanimationend = () => item.classList.add(this.classes.getNameByState(['end']))
        item.ontransitionend = () => item.parentElement?.removeChild(item)
        item.style.setProperty(this.getNameByVar('x'), `${x}px`)
        item.style.setProperty(this.getNameByVar('y'), `${y}px`)
        item.classList.add(this.classes.getNameBySubclass(['item']))
      })
    }
  }
}
exports.RippleDesign = RippleDesign
// # sourceMappingURL=RippleDesign.js.map
