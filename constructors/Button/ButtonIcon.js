'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ButtonIcon = void 0
const vue_1 = require('vue')
const Design_1 = require('../../classes/Design')
/**
 * ButtonIcon
 */
class ButtonIcon {
  classes
  components
  props
  refs
  iconBind
  trailingBind
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
    this.iconBind = Design_1.Design.getBindStatic(refs.icon, this.iconOptions, 'icon')
    this.trailingBind = Design_1.Design.getBindStatic(refs.iconTrailing, this.trailingOptions, 'icon')
  }

  /**
     * Checks if there is a main icon
     *
     * Проверяет, есть ли главная иконка
     */
  isIcon = (0, vue_1.computed)(() => !!(this.components.is('icon') && this.props.icon))
  /**
     * Checks if there is an additional icon
     *
     * Проверяет, есть ли дополнительная иконка
     */
  isTrailing = (0, vue_1.computed)(() => !!(this.components.is('icon') && this.props.iconTrailing))
  /**
     * Parameters for the main icon
     *
     * Параметры для главной иконки
     */
  iconOptions = (0, vue_1.computed)(() => {
    return {
      active: this.props?.selected,
      hide: this.props?.iconHide,
      animationType: 'type2',
      start: true
    }
  })

  /**
     * Parameter for the secondary icon
     *
     * Параметр для вторичной иконки
     */
  trailingOptions = (0, vue_1.computed)(() => {
    return {
      turn: this.props?.iconTurn,
      end: true,
      high: true
    }
  })

  /**
     * A method for rendering
     *
     * Метод для рендеринга
     * @protected
     */
  render () {
    const elements = []
    if (this.isIcon.value) {
      this.components.render(elements, 'icon', {
        class: this.classes.getNameBySubclass(['icon']),
        ...this.iconBind.value
      })
    }
    if (this.isTrailing.value) {
      this.components.render(elements, 'icon', {
        class: this.classes.getNameBySubclass(['trailing']),
        ...this.trailingBind.value
      })
    }
    return elements
  }
}
exports.ButtonIcon = ButtonIcon
// # sourceMappingURL=ButtonIcon.js.map
