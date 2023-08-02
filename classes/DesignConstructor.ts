import { ComputedRef, h, ref, Ref, SetupContext, toRefs, useAttrs, useSlots, VNode } from 'vue'
import { isFilled, replaceRecursive } from '../functions/data'
import { To } from './To'

import { Design, DesignOptionsInterface } from './Design'
import { PropertiesMapListType } from './DesignProperties'
import { ClassesListType, ClassesSubType } from './DesignClasses'
import { StylesType } from './DesignStyles'
import { ComponentsModificationType, ComponentsType, DesignComponents } from './DesignComponents'

export type ConstructorItemType = Record<string, any>
export type ConstructorRefsType<P extends ConstructorItemType> = {
  [K in keyof P]-?: Ref<P[K]>
}

export interface ConstructorOptionsInterface<
  P extends ConstructorItemType,
  S extends ClassesSubType,
  C extends ComponentsType
> extends DesignOptionsInterface<S> {
  map?: PropertiesMapListType
  components?: C
  modification?: ComponentsModificationType<P>
}

export interface ConstructorDesignInterface<S extends ClassesSubType> {
  classes?: ComputedRef<ClassesListType<S>>
  styles?: ComputedRef<StylesType>
}

export type ConstructorSetupType<
  E extends Element,
  S extends ClassesSubType,
  SETUP extends ConstructorItemType
> = {
    name: string
    element?: Ref<E | undefined>
  }
  & ConstructorDesignInterface<S>
  & SETUP

/**
 * Class for collecting all functional components
 *
 * Класс для сбора всех функциональных компонентов
 */
export class DesignConstructor<
  E extends Element,
  SETUP extends ConstructorItemType,
  SLOTS extends ConstructorItemType,
  EMITS extends ConstructorItemType,
  EXPOSE extends ConstructorItemType,
  P extends ConstructorItemType,
  S extends ClassesSubType,
  C extends ComponentsType
> {
  protected readonly name: string
  protected readonly element = ref<E | undefined>()
  protected readonly refs: ConstructorRefsType<P>

  protected attrs?: ConstructorItemType
  protected slots?: SLOTS

  protected options: ConstructorOptionsInterface<P, S, C>
  protected design?: Design<S>
  protected components?: DesignComponents<C, P>

  /**
   * Constructor
   * @param name class name / название класса
   * @param props properties / свойства
   * @param options list of additional parameters / список дополнительных параметров
   * @param emits function for calling an event / функция для вызова события
   */
  constructor (
    name: string,
    protected readonly props: Required<P>,
    options?: ConstructorOptionsInterface<P, S, C>,
    protected readonly emits?: SetupContext<EMITS, SLOTS>['emit']
  ) {
    this.name = To.kebabCase(name)
    this.refs = toRefs(this.props)

    this.attrs = useAttrs()
    this.slots = useSlots() as SLOTS

    this.options = options || {}
  }

  protected init () {
    Object.assign(this.options, this.initOptions())

    this.initDesign(this.options)
    this.initComponents(this.options)
  }

  /**
   * Initialization of basic options
   *
   * Инициализация базовых опций
   * @protected
   */
  protected initOptions (): ConstructorOptionsInterface<P, S, C> {
    return {}
  }

  /**
   * Initialization of all the necessary properties for work
   *
   * Инициализация всех необходимых свойств для работы
   * @protected
   */
  protected initSetup (): SETUP {
    return {} as SETUP
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
      class: this.design?.getClasses().main
    })
  }

  /**
   * Returns the full name of the component
   *
   * Возвращает полное название компонента
   */
  getName () {
    return this.name
  }

  /**
   * Returns the names of the design
   *
   * Возвращает названия дизайна
   */
  getDesignName (): string {
    return this.name.split('-', 2)?.[0]
  }

  /**
   * Returns the name of the component
   *
   * Возвращает название компонента
   */
  getComponentName (): string {
    return this.name.split('-', 2)?.[1]
  }

  /**
   * Returns the names of the user properties
   *
   * Возвращает название пользовательского свойства
   * @param names class name / название класса
   */
  getVarName (names: string | string[]) {
    return `--${this.name}-sys-${names.length > 0 ? `-${To.array(names).join('-')}` : ''}`
  }

  /**
   * Returns the input property
   *
   * Возвращает входное свойство
   */
  getProps () {
    return this.props
  }

  /**
   * Returns the used classes and styles
   *
   * Возвращает использованные классы и стили
   */
  getDesign (): ConstructorDesignInterface<S> {
    return {
      classes: this.design?.getClassesRef(),
      styles: this.design?.getStylesRef()
    }
  }

  /**
   * Execution method to replace setup in Vue
   *
   * Метод выполнения, для замены setup в Vue
   */
  setup (): ConstructorSetupType<E, S, SETUP> {
    return {
      name: this.name,
      element: this.element,
      ...this.getDesign(),
      ...this.initSetup()
    }
  }

  /**
   * The rendering method for the setup method
   *
   * Метод рендеринга для метода настройки
   */
  render (): () => VNode {
    return () => this.initRender()
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
   * Initializes the slot
   *
   * Инициализирует слот
   * @param children if you pass this element, the slot will be added to it / если передать
   * @param name slot name / название слота
   * @param props property for the slot / свойство для слота
   * этот элемент, то слот добавится в него
   * @protected
   */
  protected readSlot<K extends keyof SLOTS> (
    name: K,
    props: ConstructorItemType = {},
    children?: any[]
  ): VNode | undefined {
    if (
      this.slots &&
      name in this.slots &&
      typeof this.slots[name] === 'function'
    ) {
      const read = this.slots[name](props)

      if (children) {
        children.push(read)
      }

      return read
    }

    return undefined
  }

  /**
   * Initialization of a class for working with design tokens
   *
   * Инициализация класса для работы с дизайн-токенами
   * @private
   */
  private initDesign (
    options?: ConstructorOptionsInterface<P, S, C>
  ) {
    if (
      options &&
      options?.map &&
      isFilled(options.map)
    ) {
      this.design = new Design(
        this.name,
        this.props,
        options.map,
        options
      )
    }
  }

  /**
   * Initialization of a class for working with input components
   *
   * Инициализация класса для работы с входными компонентами
   * @private
   */
  private initComponents (
    options?: ConstructorOptionsInterface<P, S, C>
  ) {
    if (
      options &&
      options?.components &&
      isFilled(options.components)
    ) {
      this.components = new DesignComponents(
        options.components,
        options?.modification
      )
    }
  }
}
