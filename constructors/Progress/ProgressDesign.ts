import { computed, ComputedRef, h, ref, VNode, watch } from 'vue'

import {
  Design,
  DesignEmitsType,
  DesignPropsType,
  DesignPropsValueType,
  DesignSetupType
} from '../../classes/Design'

import { PropsProgressInterface } from './props'

export interface ProgressDesignComponentsInterface {
  component: object
}

export interface ProgressDesignInitInterface {
  tag: ComputedRef<string>
  valueInPercent: ComputedRef<string | null>
  onAnimation: (event: AnimationEvent) => void
}

export type ProgressDesignSubClassesType = {
  circle: 'circle'
}

export type ProgressDesignPropsValueType = DesignPropsValueType<PropsProgressInterface>
export type ProgressDesignEmitsType = DesignEmitsType
export type ProgressDesignSlotsType = DesignPropsType

/**
 * ProgressDesign
 */
export class ProgressDesign<
  C extends ProgressDesignSubClassesType = ProgressDesignSubClassesType,
  P extends ProgressDesignPropsValueType = ProgressDesignPropsValueType
> extends Design<
  C,
  HTMLDivElement,
  P,
  ProgressDesignInitInterface,
  ProgressDesignComponentsInterface,
  ProgressDesignEmitsType,
  ProgressDesignSlotsType
> {
  protected readonly hide = ref<boolean>(false)
  protected readonly visible = ref<boolean>(false)

  protected timeout?: NodeJS.Timeout

  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): ProgressDesignInitInterface {
    this.classes.setExtraMain(this.classesStatus)
    this.styles.setExtra(this.stylesStatus)

    watch(this.refs.visible, () => this.watchVisible(), { immediate: true })

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
   * @param setup the result of executing the setup method / результат выполнения метода настройки
   * @protected
   */
  protected initRender<D = Record<string, any>> (
    setup: DesignSetupType<C, HTMLDivElement, D, ProgressDesignInitInterface>
  ): VNode {
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

    return h(setup.tag.value, {
      ref: this.element,
      class: setup.classes.value.main,
      viewBox: '0 0 48 48',
      onAnimationendStop: setup.onAnimation
    }, children)
  }

  /**
   * Determines the type of the main element
   *
   * Определяет, какой тип у главного элемента
   * @protected
   */
  protected readonly tag = computed<string>(() => this.props.circular ? 'svg' : 'div')

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

    if (this.visible.value !== this.refs.visible.value) {
      if (this.refs.visible.value) {
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
    this.hide.value = !this.refs.visible.value
    this.visible.value = !!this.refs.visible.value

    return this
  }
}
