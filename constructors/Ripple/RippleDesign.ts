import { h, SlotsType, VNode } from 'vue'
import { createElement } from '../../functions/element'

import {
  Design,
  DesignEmitsType,
  DesignPropsValueType,
  DesignSetupType
} from '../../classes/Design'
import { ClassesSubClassesType } from '../../classes/DesignClasses'
import { AssociativeType } from '../types'

import { propsRipple } from './props'

export interface RippleDesignInitInterface {
  onClick: (event: MouseEvent) => void
}

export type RippleDesignPropsValueType = DesignPropsValueType<typeof propsRipple>
export type RippleDesignEmitsType = DesignEmitsType
export type RippleDesignSlotsType = SlotsType

/**
 * RippleDesign
 */
export class RippleDesign<
  C extends ClassesSubClassesType = ClassesSubClassesType,
  P extends RippleDesignPropsValueType = RippleDesignPropsValueType
> extends Design<
  C,
  HTMLDivElement,
  P,
  RippleDesignInitInterface,
  AssociativeType,
  RippleDesignEmitsType,
  RippleDesignSlotsType
> {
  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): RippleDesignInitInterface {
    return {
      onClick: (event: MouseEvent) => this.addItem(event.offsetX, event.offsetY)
    }
  }

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @param setup the result of executing the setup method / результат выполнения метода настройки
   * @protected
   */
  protected initRender<D = Record<string, any>> (
    setup: DesignSetupType<C, HTMLDivElement, D, RippleDesignInitInterface>
  ): VNode {
    return h('div', {
      ref: this.element,
      class: setup.classes.value.main,
      onMousedown: setup.onClick
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
