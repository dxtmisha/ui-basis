import { computed, VNode } from 'vue'
import { render } from '../../functions/render'

export type ButtonLabelSlotsType = {
  default? (props: any): any
}

export type PropsButtonLabelType = {
  label?: string
}

export const propsButtonLabel = {
  label: [String, Number]
}

/**
 * Class for working with text on the button
 *
 * Класс для работы с текстом на кнопке
 */
export class ButtonLabel {
  /**
   * Constructor
   * @param props input property / входное свойство
   * @param slots object for working with slots / объект для работы со слотами
   * @param className class name / название класса
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly props: Readonly<PropsButtonLabelType>,
    protected readonly slots: ButtonLabelSlotsType,
    protected readonly className?: string
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
   * @protected
   */
  render (): VNode[] {
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
        children.push(this.slots.default?.({}))
      }

      if (children.length > 0) {
        elements.push(render(
          'span',
          { class: this.className || 'label' },
          children
        ))
      }
    }

    return elements
  }
}
