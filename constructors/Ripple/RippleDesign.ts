import { h, VNode } from 'vue'
import { createElement } from '../../functions/element'

import { Design } from '../../classes/Design'

import {
  RippleEmitsType,
  RippleInitInterface,
  RipplePropsValueType,
  RippleSlotsType,
  RippleSubClassesType
} from './types'

/**
 * RippleDesign
 */
export class RippleDesign<
  C extends RippleSubClassesType = RippleSubClassesType,
  P extends RipplePropsValueType = RipplePropsValueType
> extends Design<
  C,
  HTMLDivElement,
  P,
  RippleInitInterface,
  Record<string, any>,
  RippleEmitsType,
  RippleSlotsType
> {
  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): RippleInitInterface {
    return {
      onClick: (event: MouseEvent) => this.addItem(event.offsetX, event.offsetY)
    }
  }

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  protected initRender (): VNode {
    return h('div', {
      ref: this.element,
      class: this.setupItem.classes.value.main,
      onMousedown: this.setupItem.onClick
    })
  }

  /**
   * Adding a new light element
   *
   * Добавление нового элемента свечения
   * @param x x-coordinate / x-координата
   * @param y y-coordinate / y-координата
   * @private
   */
  private addItem (x: number, y: number): void {
    if (
      !this.props.disabled &&
      this.element.value
    ) {
      createElement<HTMLSpanElement>(this.element.value, 'span', item => {
        item.onanimationend = () => item.classList.add(this.classes.getNameByState(['end']))
        item.ontransitionend = () => item.parentElement?.removeChild(item)

        item.style.setProperty(this.getNameByVar('x'), `${x}px`)
        item.style.setProperty(this.getNameByVar('y'), `${y}px`)

        item.classList.add(this.classes.getNameBySubclass(['item']))
      })
    }
  }
}
