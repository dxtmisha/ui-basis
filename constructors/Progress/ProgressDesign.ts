import { computed, h, ref, SetupContext, VNode, watch } from 'vue'

import { ConstructorItemType, ConstructorOptionsInterface, DesignConstructor } from '../../classes/DesignConstructor'
import { ComponentsType } from '../../classes/DesignComponents'

import { ProgressSetupInterface } from './types'
import { PropsProgressFullType, subclassesProgress } from './props'

/**
 * ProgressDesign
 */
export class ProgressDesign<
  SETUP extends ProgressSetupInterface,
  EXPOSE extends ConstructorItemType,
  P extends PropsProgressFullType,
  S extends typeof subclassesProgress,
  C extends ComponentsType
> extends DesignConstructor<
  HTMLDivElement,
  SETUP,
  ConstructorItemType,
  ConstructorItemType,
  EXPOSE,
  P,
  S,
  C
> {
  /**
   * Defines the conditions for transitioning to a hidden state
   *
   * Определяет условия для перехода в скрытое состояние
   * @protected
   */
  public readonly hide = ref<boolean>(false)

  /**
   * Defines the conditions for opening
   *
   * Определяет условия для открытия
   * @protected
   */
  public readonly visible = ref<boolean>(false)

  /**
   * Checks if a specific value has been passed
   *
   * Проверяет, передано ли конкретное значение
   * @protected
   */
  public readonly isValue = computed<boolean>(() => {
    return typeof this.props?.value === 'number'
  })

  /**
   * Values are converted to percentages
   *
   * Значения преобразованы в проценты
   * @protected
   */
  public readonly valueInPercent = computed<string | null>(() => {
    if (typeof this.props?.value === 'number') {
      return this.props?.circular
        ? `${(100 / (this.props?.max || 100) * this.props.value)}`
        : `${100 - (100 / (this.props?.max || 100) * this.props.value)}%`
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
  public readonly tag = computed<string>(() => this.props?.circular ? 'svg' : 'div')

  /**
   * Time for delay control
   *
   * Время для управления задержкой
   * @protected
   */
  private timeout?: NodeJS.Timeout

  /**
   * Constructor
   * @param name class name / название класса
   * @param props properties / свойства
   * @param options list of additional parameters / список дополнительных параметров
   * @param emits function for calling an event / функция для вызова события
   */
  constructor (
    name: string,
    props: Required<P>,
    options?: ConstructorOptionsInterface<P, S, C>,
    emits?: SetupContext['emit']
  ) {
    super(
      name,
      props,
      options,
      emits
    )

    watch(
      [
        this.refs.visible,
        this.refs.value
      ],
      () => this.watchVisible(),
      { immediate: true }
    )

    this.init()
  }

  /**
   * Monitors the animation event for hiding the element
   *
   * Следит за событием анимации для скрытия элемента
   * @param animationName A string containing the value of the animation-name that
   * generated the animation / Является DOMString содержащей значения animation-name
   * CSS-свойств связанных с transition
   */
  onAnimation ({ animationName }: AnimationEvent): void {
    if (animationName.match('-hidden')) {
      this.hide.value = false
    }
  }

  /**
   * Initialization of basic options
   *
   * Инициализация базовых опций
   * @protected
   */
  protected initOptions (): ConstructorOptionsInterface<P, S, C> {
    return {
      extra: {
        hide: this.hide,
        visible: this.visible,
        value: this.isValue
      },
      styles: {
        value: this.valueInPercent
      }
    }
  }

  /**
   * Initialization of all the necessary properties for work
   *
   * Инициализация всех необходимых свойств для работы
   * @protected
   */
  protected initSetup (): SETUP {
    return {
      tag: this.tag,
      valueInPercent: this.valueInPercent,
      onAnimation: (event: AnimationEvent) => this.onAnimation(event)
    } as SETUP
  }

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  protected initRender (): VNode {
    const children: any[] = []
    const classes = this.design?.getClasses()

    if (this.props?.circular) {
      children.push(
        h('circle', {
          class: classes?.circle,
          cx: '24',
          cy: '24',
          r: '20'
        })
      )
    }

    return h(this.tag.value, {
      ref: this.element,
      class: classes?.main,
      style: this.design?.getStyles(),
      viewBox: '0 0 48 48',
      onAnimationend: (event: AnimationEvent) => this.onAnimation(event)
    }, children)
  }

  /**
   * The mode is triggered when the visible property changes to change the output status of the element
   *
   * Метод срабатывает при изменении свойства visible для изменения статуса вывода элемента
   * @private
   */
  private watchVisible () {
    clearTimeout(this.timeout)

    if (this.props?.value) {
      this.hide.value = false
      this.visible.value = false
    } else if (this.visible.value !== this.props?.visible) {
      if (this.props?.visible) {
        this.timeout = setTimeout(() => this.updateVisible(), this.props?.delay || 0)
      } else {
        this.updateVisible()
      }
    }
  }

  /**
   * Updates dependent data when the visible property changes
   *
   * Обновляет зависимые данные при изменении свойства visible
   * @private
   */
  private updateVisible () {
    this.hide.value = !this.props?.visible
    this.visible.value = !!this.props?.visible

    return this
  }
}
