import { computed, VNode } from 'vue'

import { DesignEmitsType, DesignSetupContextType } from '../../classes/Design'
import { DesignComponents } from '../../classes/DesignComponents'
import { ClassesItemType } from '../../classes/DesignClasses'

import { ButtonComponentsInterface, ButtonPropsValueType, ButtonSlotsType } from './types'

/**
 * Class for working with text on the button
 *
 * Класс для работы с текстом на кнопке
 */
export class ButtonInscription<
  C extends ButtonComponentsInterface = ButtonComponentsInterface,
  S extends ButtonSlotsType = ButtonSlotsType
> {
  /**
   * Constructor
   * @param components object for working with components / объект для работы с компонентами
   * @param slots object for working with slots / объект для работы со слотами
   * @param props input property / входное свойство
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly components: DesignComponents<C>,
    protected readonly slots: DesignSetupContextType<DesignEmitsType, S>['slots'],
    protected readonly props: ButtonPropsValueType
  ) {
  }

  /**
   * Checking if the text is available
   *
   * Проверка, доступен ли текст
   */
  readonly isInscription = computed<boolean>(() => !!this.props.label || 'default' in this.slots)

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @param className class name / название класса
   * @protected
   */
  render (className: ClassesItemType): VNode[] {
    const elements: any[] = []

    if (this.isInscription.value) {
      const children: any[] = []

      if (this.props.label) {
        children.push(this.props.label)
      }

      if (this.slots?.default) {
        children.push(this.slots.default?.())
      }

      elements.push(
        this.components.getNode('span', { class: className }, children, 'inscription')
      )
    }

    return elements
  }
}
