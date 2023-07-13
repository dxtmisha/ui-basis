import { computed, h, VNode } from 'vue'

import { DesignEmitsType, DesignSetupContextType } from '../../classes/Design'
import { ClassesItemType } from '../../classes/DesignClasses'

import { ButtonDesignPropsValueType, ButtonDesignSlotsType } from './types'

/**
 * Class for working with text on the button
 *
 * Класс для работы с текстом на кнопке
 */
export class ButtonInscription<S extends ButtonDesignSlotsType = ButtonDesignSlotsType> {
  /**
   * Constructor
   * @param slots object for working with slots / объект для работы со слотами
   * @param props input property / входное свойство
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly slots: DesignSetupContextType<DesignEmitsType, S>['slots'],
    protected readonly props: ButtonDesignPropsValueType
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
  render (className: ClassesItemType): VNode {
    const children: any[] = [
      this.props.inscription
    ]

    if ('default' in this.slots) {
      children.push(this.slots.default?.())
    }

    return h('span', { class: className }, children)
  }
}
