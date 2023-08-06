import { computed, h, ref, VNode, watch } from 'vue'

import {
  ConstrItemType,
  ConstrOptionsInterface,
  DesignConstructor
} from '../../classes/DesignConstructor'

import { ProgressValue } from './ProgressValue'

import { ProgressSetupInterface } from './types'
import { PropsProgressType, subclassesProgress } from './props'

/**
 * ProgressDesign
 */
export class ProgressDesign<
  SETUP extends ProgressSetupInterface,
  EXPOSE extends ConstrItemType,
  P extends PropsProgressType,
  S extends typeof subclassesProgress,
  C extends ConstrItemType
> extends DesignConstructor<
  HTMLElement,
  SETUP,
  ConstrItemType,
  ConstrItemType,
  EXPOSE,
  P,
  S,
  C
> {
  private readonly hide = ref<boolean>(false)
  private readonly visible = ref<boolean>(false)
  private timeout?: NodeJS.Timeout

  private readonly tag = computed<string>(() => this.props?.circular ? 'svg' : 'div')
  private readonly value?: ProgressValue<P>

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

    const source: any[] = [this.refs.visible]

    if ('value' in props) {
      this.value = new ProgressValue(props)
      source.push(this.refs.value)
    }

    watch(
      source,
      () => this.watchVisible(),
      { immediate: true }
    )

    this.init()
  }

  /**
   * Initialization of basic options
   *
   * Инициализация базовых опций
   * @protected
   */
  protected initOptions (): ConstrOptionsInterface<P, S, C> {
    const extra = {
      '??hide': this.hide,
      '??visible': this.visible
    }

    if (this.value) {
      return {
        extra: {
          ...extra,
          '??value': this.value.isValue
        },
        styles: {
          '??value': this.value.valueInPercent
        }
      }
    } else {
      return {
        extra
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
    const setup: SETUP = {
      tag: this.tag,
      hide: this.hide,
      visible: this.visible,
      onAnimation: (event: AnimationEvent) => this.onAnimation(event)
    } as SETUP

    if (this.value) {
      setup.valueInPercent = this.value.valueInPercent
    }

    return setup
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
   * List of available external variables
   *
   * Список доступных переменных извне
   */
  expose (): EXPOSE {
    return {} as EXPOSE
  }

  /**
   * Monitors the animation event for hiding the element
   *
   * Следит за событием анимации для скрытия элемента
   * @param animationName A string containing the value of the animation-name that
   * generated the animation / Является DOMString содержащей значения animation-name
   * CSS-свойств связанных с transition
   */
  private onAnimation ({ animationName }: AnimationEvent): void {
    if (animationName.match('-hidden')) {
      this.hide.value = false
    }
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
