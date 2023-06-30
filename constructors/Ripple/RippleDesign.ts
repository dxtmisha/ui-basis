import { createElement } from '../../functions/element'

import { Design, DesignPropsValueType } from '../../classes/Design'
import { ClassesSubClassesType } from '../../classes/DesignClasses'

import { props } from './props'

interface RippleDesignInitInterface {
  onClick: (event: MouseEvent) => void
}

type RippleDesignPropsValueType = DesignPropsValueType<typeof props>

export class RippleDesign<
  C extends ClassesSubClassesType = ClassesSubClassesType,
  P extends RippleDesignPropsValueType = RippleDesignPropsValueType
> extends Design<C, HTMLDivElement, P, RippleDesignInitInterface> {
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
        // item.ontransitionend = () => item.parentElement?.removeChild(item)

        item.style.setProperty(this.getNameByVar('x'), `${x}px`)
        item.style.setProperty(this.getNameByVar('y'), `${y}px`)

        item.classList.add(this.classes.getNameBySubclass(['item']))
      })
    }
  }
}
