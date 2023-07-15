import { computed, h, VNode } from 'vue'

import { DesignEmitsType, DesignSetupContextType } from '../../classes/Design'
import { ClassesItemType } from '../../classes/DesignClasses'

import { ButtonPropsValueType, ButtonSlotsType } from './types'

/**
 * Class for working with text on the button
 *
 * Класс для работы с текстом на кнопке
 */
export class ButtonInscription<S extends ButtonSlotsType = ButtonSlotsType> {
  /**
   * Constructor
   * @param slots object for working with slots / объект для работы со слотами
   * @param props input property / входное свойство
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly slots: DesignSetupContextType<DesignEmitsType, S>['slots'],
    protected readonly props: ButtonPropsValueType
  ) {
  }

  /**
   * Checking if the text is available
   *
   * Проверка, доступен ли текст
   */
  readonly isInscription = computed<boolean>(() => !!this.props.inscription || 'default' in this.slots)

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

      if (this.props.inscription) {
        children.push(this.props.inscription)
      }

      if (this.slots?.default) {
        children.push(this.slots.default?.())
      }

      elements.push(h('span', { class: className }, children))
    }

    return elements
  }
}
