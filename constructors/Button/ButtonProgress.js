'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ButtonProgress = void 0
const vue_1 = require('vue')
const Design_1 = require('../../classes/Design')
/**
 * ButtonProgress
 */
class ButtonProgress {
  classes
  components
  props
  refs
  bind
  /**
     * Constructor
     * @param classes class name for the component / название класса для компонента
     * @param components object for working with components / объект для работы с компонентами
     * @param props input parameter / входной параметр
     * @param refs object for working with components / входной параметр в виде реактивной ссылки
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (classes, components, props, refs) {
    this.classes = classes
    this.components = components
    this.props = props
    this.refs = refs
    if ('progress' in this.props) {
      this.bind = Design_1.Design.getBindStatic(refs?.progress, {
        circular: true,
        inverse: true,
        delay: 128
      }, 'visible')
    }
  }

  /**
     * Checks if the element is active
     *
     * Проверяет, активен ли элемент
     */
  is = (0, vue_1.computed)(() => !!(this.components.is('progress') && this.props?.progress))
  /**
     * A method for rendering
     *
     * Метод для рендеринга
     * @protected
     */
  render () {
    const elements = []
    if (this.bind &&
            this.is.value) {
      this.components.render(elements, 'progress', {
        class: this.classes.getNameBySubclass(['progress']),
        ...this.bind.value
      })
    }
    return elements
  }
}
exports.ButtonProgress = ButtonProgress
// # sourceMappingURL=ButtonProgress.js.map
