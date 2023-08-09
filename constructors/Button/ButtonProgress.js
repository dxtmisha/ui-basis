'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ButtonProgress = exports.propsButtonProgress = void 0
const vue_1 = require('vue')
const render_1 = require('../../functions/render')
exports.propsButtonProgress = {
  progress: [Boolean, Object]
}
/**
 * ButtonProgress
 */
class ButtonProgress {
  props
  components
  classesName
  bind
  /**
     * Constructor
     * @param props input parameter / входной параметр
     * @param components object for working with components / объект для работы с компонентами
     * @param classesName class name for the component / название класса для компонента
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (props, components, classesName) {
    this.props = props
    this.components = components
    this.classesName = classesName
    this.bind = (0, render_1.getBind)((0, vue_1.toRefs)(this.props)?.progress, {
      circular: true,
      inverse: true,
      delay: 128
    }, 'visible')
  }

  /**
     * A method for rendering
     *
     * Метод для рендеринга
     * @protected
     */
  render () {
    const elements = []
    if (this.components &&
            this.props?.progress) {
      this.components.renderAdd(elements, 'progress', {
        class: this.classesName || 'progress',
        ...this.bind.value
      })
    }
    return elements
  }
}
exports.ButtonProgress = ButtonProgress
// # sourceMappingURL=ButtonProgress.js.map
