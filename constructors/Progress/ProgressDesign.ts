import { computed, h, ref, VNode, watch } from 'vue'

import {
  Design,
  DesignSetupContextEmitType
} from '../../classes/Design'

import {
  ProgressEmitsType,
  ProgressInitInterface,
  ProgressPropsValueType,
  ProgressSlotsType,
  ProgressSubClassesType
} from './types'

/**
 * ProgressDesign
 */
export class ProgressDesign<
  C extends ProgressSubClassesType = ProgressSubClassesType,
  P extends ProgressPropsValueType = ProgressPropsValueType
> extends Design<
  C,
  HTMLElement,
  P,
  ProgressInitInterface,
  Record<string, any>,
  ProgressEmitsType,
  ProgressSlotsType
> {
  /**
   * Defines the conditions for transitioning to a hidden state
   *
   * Определяет условия для перехода в скрытое состояние
   * @protected
   */
  protected readonly hide = ref<boolean>(false)

  /**
   * Defines the conditions for opening
   *
   * Определяет условия для открытия
   * @protected
   */
  protected readonly visible = ref<boolean>(false)

  /**
   * Time for delay control
   *
   * Время для управления задержкой
   * @protected
   */
  protected timeout?: NodeJS.Timeout

  /**
   * Constructor
   * @param props properties / свойства
   * @param contextEmit additional property / дополнительное свойство
   */
  constructor (
    protected readonly props: P,
    contextEmit?: DesignSetupContextEmitType<ProgressEmitsType, ProgressSlotsType>
  ) {
    super(props, contextEmit)

    this.classes.setExtraMain(this.classesStatus)
    this.styles.setExtra(this.stylesStatus)

    watch(
      [
        this.refs.visible,
        this.refs.value
      ],
      () => this.watchVisible(),
      { immediate: true }
    )
  }

  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): ProgressInitInterface {
    return {
      tag: this.tag,
      valueInPercent: this.valueInPercent,
      onAnimation: (event: AnimationEvent) => this.onAnimation(event)
    }
  }

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  protected initRender (): VNode {
    const setup = this.getSetup()
    const children: any[] = []

    if (this.props.circular) {
      children.push(
        h('circle', {
          class: setup.classes.value.circle,
          cx: '24',
          cy: '24',
          r: '20'
        }))
    }

    return h(this.tag.value, {
      ref: this.element,
      class: setup.classes.value.main,
      style: setup.styles.value,
      viewBox: '0 0 48 48',
      onAnimationend: setup.onAnimation
    }, children)
  }

  /**
   * List of classes for data display control
   *
   * Список классов для управления отображением данных
   * @protected
   */
  protected readonly classesStatus = computed<Record<string, boolean>>(() => {
    return {
      [this.classes.getNameByState(['hide'])]: this.hide.value,
      [this.classes.getNameByState(['visible'])]: this.visible.value,
      [this.classes.getNameByState(['value'])]: !!this.valueInPercent.value
    }
  })

  /**
   * List of styles for data display control
   *
   * Список стилей для управления отображением данных
   * @protected
   */
  protected readonly stylesStatus = computed<Record<string, string | null>>(() => {
    return {
      [this.getNameByVar('value')]: this.valueInPercent.value
    }
  })

  /**
   * Values are converted to percentages
   *
   * Значения преобразованы в проценты
   * @protected
   */
  protected readonly valueInPercent = computed<string | null>(() => {
    if (typeof this.props.value === 'number') {
      return this.props.circular
        ? `${(100 / (this.props.max || 100) * this.props.value)}`
        : `${100 - (100 / (this.props.max || 100) * this.props.value)}%`
    } else {
      return null
    }
  })

  /**
   * Determines the type of the main element
   *
   * Определяет, какой тип у главного элемента
   * @protected
   */
  protected readonly tag = computed<string>(() => this.props.circular ? 'svg' : 'div')

  /**
   * Monitors the animation event for hiding the element
   *
   * Следит за событием анимации для скрытия элемента
   * @param animationName A string containing the value of the animation-name that
   * generated the animation / Является DOMString содержащей значения animation-name
   * CSS-свойств связанных с transition
   * @protected
   */
  protected onAnimation ({ animationName }: AnimationEvent): void {
    if (animationName.match('-hidden')) {
      this.hide.value = false
    }
  }

  /**
   * The mode is triggered when the visible property changes to change the output status of the element
   *
   * Метод срабатывает при изменении свойства visible для изменения статуса вывода элемента
   * @protected
   */
  protected watchVisible () {
    clearTimeout(this.timeout)

    if (this.props.value) {
      this.hide.value = false
      this.visible.value = false
    } else if (this.visible.value !== this.props.visible) {
      if (this.props.visible) {
        this.timeout = setTimeout(() => this.updateVisible(), this.props.delay || 0)
      } else {
        this.updateVisible()
      }
    }
  }

  /**
   * Updates dependent data when the visible property changes
   *
   * Обновляет зависимые данные при изменении свойства visible
   * @protected
   */
  protected updateVisible () {
    this.hide.value = !this.props.visible
    this.visible.value = !!this.props.visible

    return this
  }
}
