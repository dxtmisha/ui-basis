import { computed, VNode } from 'vue'

import {
  DesignPropsType,
  DesignPropsValueType,
  DesignSetupContextSlotsType
} from '../../classes/Design'
import { ClassesItemType } from '../../classes/DesignClasses'
import { DesignComponents } from '../../classes/DesignComponents'

export type LabelPropsValueType = {
  label?: string
}

export type LabelSlotsType = {
  default? (): any
}

/**
 * Class for working with text on the button
 *
 * Класс для работы с текстом на кнопке
 */
export class UseLabel<
  P extends LabelPropsValueType = LabelPropsValueType,
  S extends LabelSlotsType = LabelSlotsType
> {
  /**
   * Constructor
   * @param components object for working with components / объект для работы с компонентами
   * @param slots object for working with slots / объект для работы со слотами
   * @param props input property / входное свойство
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly components: DesignComponents,
    protected readonly props: P,
    protected readonly slots: DesignSetupContextSlotsType<S>
  ) {
  }

  /**
   * Checking if the text is available
   *
   * Проверка, доступен ли текст
   */
  readonly is = computed<boolean>(() => !!this.props?.label || 'default' in this.slots)

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @param className class name / название класса
   * @protected
   */
  render (className: ClassesItemType): VNode[] {
    const elements: any[] = []

    if (
      'label' in this.props &&
      this.is.value
    ) {
      const children: any[] = []

      if (this.props.label) {
        children.push(this.props.label)
      }

      if (this.slots?.default) {
        children.push(this.slots.default?.())
      }

      elements.push(this.components.getNode(
        'span',
        { class: className },
        children,
        'label'
      ))
    }

    return elements
  }
}
