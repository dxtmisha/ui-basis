import { h, VNode } from 'vue'
import { createElement } from '../../functions/element'

import {
  ConstrItemType,
  ConstrOptionsInterface,
  DesignConstructor
} from '../../classes/DesignConstructor'

import { RippleSetupInterface } from './types'
import { PropsRippleType, subclassesRipple } from './props'

/**
 * RippleDesign
 */
export class RippleDesign<
  SETUP extends RippleSetupInterface,
  EXPOSE extends ConstrItemType,
  P extends PropsRippleType,
  S extends typeof subclassesRipple,
  C extends ConstrItemType
> extends DesignConstructor<
  HTMLDivElement,
  SETUP,
  ConstrItemType,
  ConstrItemType,
  EXPOSE,
  P,
  S,
  C
> {
  /**
   * Constructor
   * @param name class name / название класса
   * @param props properties / свойства
   * @param options list of additional parameters / список дополнительных параметров
   */
  constructor (
    name: string,
    props: Readonly<P>,
    options?: ConstrOptionsInterface<P, S, C>
  ) {
    super(
      name,
      props,
      options
    )

    this.init()
  }

  /**
   * Initialization of all the necessary properties for work
   *
   * Инициализация всех необходимых свойств для работы
   * @protected
   */
  protected initSetup (): SETUP {
    return {
      onClick: (event: MouseEvent) => this.addItem(event.offsetX, event.offsetY)
    } as SETUP
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
      class: this.design?.getClasses().main,
      onMousedown: (event: MouseEvent) => this.addItem(event.offsetX, event.offsetY)
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
      this.element.value &&
      !this.props?.disabled
    ) {
      createElement<HTMLSpanElement>(this.element.value, 'span', item => {
        item.onanimationend = () => item.classList.add(this.design?.getClassesByState(['end']) || 'is-end')
        item.ontransitionend = () => item.parentElement?.removeChild(item)

        item.style.setProperty(this.design?.getCustomName('x') || '--x', `${x}px`)
        item.style.setProperty(this.design?.getCustomName('y') || '--y', `${y}px`)
        item.classList.add(this.design?.getClassesBySubclass(['item']))
      })
    }
  }
}
