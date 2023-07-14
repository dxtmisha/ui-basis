import {
  computed,
  ComputedRef,
  defineExpose,
  EmitsOptions,
  h,
  onUpdated,
  Ref,
  ref,
  SetupContext,
  SlotsType,
  toRefs,
  useAttrs,
  useSlots,
  VNode
} from 'vue'
import { executeFunction } from '../functions/data'
import { getRef } from '../functions/ref'
import { To } from './To'

import {
  DesignClasses,
  ClassesListType,
  ClassesSubClassesType,
  ClassesExtraListType,
  ClassesExtraRefType
} from './DesignClasses'
import { DesignProperties, PropertiesListType } from './DesignProperties'
import { DesignStyles, StylesListType, StylesRefType } from './DesignStyles'

import { AssociativeType, ElementType } from '../constructors/types'
import { RefOrNormalType } from '../constructors/typesRef'
import { DesignComponents } from './DesignComponents'

export interface DesignSetupBasicInterface<C, E> {
  element: Ref<E | undefined>
  classes: ComputedRef<ClassesListType<C>>
  styles: ComputedRef<StylesListType | undefined>
}

export type DesignPropsType = Record<string, any>
export type DesignPropsPrototypeType<T extends DesignPropsType> = Partial<T>
export type DesignPropsValueType<
  T extends DesignPropsType = DesignPropsType
> = DesignPropsPrototypeType<T> & DesignPropsType
export type DesignPropsRefsType<T = DesignPropsType> = {
  [K in keyof T]-?: Ref<any>
}

export type DesignEmitsCallbackType = ((...args: any[]) => any) | Record<string, any[]>
export type DesignEmitsType = EmitsOptions | DesignEmitsCallbackType
export type DesignSlotNamesType<T extends DesignPropsType> = keyof T

export type DesignSetupContextType<
  O extends DesignEmitsType = DesignEmitsType,
  S extends DesignPropsType = DesignPropsType
> = SetupContext<O, SlotsType<S>>

export type DesignSetupContextEmitType<
  O extends DesignEmitsType = DesignEmitsType,
  S extends DesignPropsType = DesignPropsType
> = DesignSetupContextType<O, S> | DesignSetupContextType<O, S>['emit']

export type DesignSetupValueType<D = AssociativeType> = D | (() => D)
export type DesignSetupType<
  C,
  E,
  D = AssociativeType,
  T = AssociativeType
> = DesignSetupBasicInterface<C, E> & D & T

/**
 * Main class for binding tokens and Vue components
 *
 * Основной класс для связывания токенов и компонентов Vue
 */
export class Design<
  C extends ClassesSubClassesType = ClassesSubClassesType,
  E extends ElementType = ElementType,
  P extends DesignPropsValueType = DesignPropsValueType,
  I extends Record<string, any> = Record<string, any>,
  M extends AssociativeType = AssociativeType,
  O extends DesignEmitsType = EmitsOptions,
  S extends DesignPropsType = DesignPropsType
> {
  /**
   * Class name
   *
   * Название класса
   * @protected
   */
  protected name = ref<string>('design-component')

  /**
   * List of connected components
   *
   * Список подключенных компонентов
   * @protected
   */
  protected components: DesignComponents<M>
  protected element = ref<E>()

  protected refs: DesignPropsRefsType<P>
  protected setupItem?: DesignSetupType<C, E, AssociativeType, I>

  protected context: DesignSetupContextType<O, S>
  protected attrs: DesignSetupContextType<O, S>['attrs']
  protected slots: DesignSetupContextType<O, S>['slots']
  protected emit: DesignSetupContextType<O, S>['emit']
  protected expose: DesignSetupContextType<O, S>['expose']

  protected properties: DesignProperties
  protected classes: DesignClasses<C>
  protected styles: DesignStyles

  /**
   * Constructor
   * @param props properties / свойства
   * @param contextEmit additional property / дополнительное свойство
   */
  constructor (
    protected readonly props: P,
    contextEmit?: DesignSetupContextEmitType<O, S>
  ) {
    this.refs = toRefs(props) as DesignPropsRefsType<P>
    this.properties = new DesignProperties()
    this.components = new DesignComponents<M>()

    this.context = this.initContext(contextEmit)
    this.attrs = this.context.attrs
    this.slots = this.context.slots
    this.emit = this.context.emit
    this.expose = this.context.expose

    this.classes = new DesignClasses<C>(
      this.name,
      this.properties,
      this.props as AssociativeType
    )

    this.styles = new DesignStyles(
      this.name,
      this.properties,
      this.props as AssociativeType
    )

    if (process.env.NODE_ENV !== 'production') {
      onUpdated(() => console.warn(`Updated: ${this.getName()}`))
    }
  }

  /**
   * Returns the base class name
   *
   * Возвращает базовое название класса
   */
  getName (): string {
    return this.classes.getName()
  }

  /**
   * Returns the names of the user properties
   *
   * Возвращает название пользовательского свойства
   * @param names class name / название класса
   */
  getNameByVar (names: string | string[]) {
    return `--${this.getName()}${names.length > 0 ? `-${To.array(names).join('-')}` : ''}`
  }

  /**
   * Component names.
   * Are added automatically during build
   *
   * Названия компонентов.
   * Добавляются автоматически во время сборки
   * @param name class name / название класса
   */
  setName (name: string): this {
    this.name.value = name
    return this
  }

  /**
   * Modifying the list of subclasses
   *
   * Изменение списка подклассов
   * @param classes list of subclass values / список значений подкласса
   */
  setSubClasses (classes: C): this {
    this.classes.setSubClasses(classes)
    return this
  }

  /**
   * Adding additional classes
   *
   * Добавление дополнительных классов
   * @param data list of additional classes / список дополнительных классов
   */
  setExtra (data: ClassesExtraListType): this {
    this.classes.setExtra(data)
    return this
  }

  /**
   * Adding additional classes for the base class
   * Добавление дополнительных классов для базового класса
   * @param data list of additional classes / список дополнительных классов
   */
  setExtraMain (data: ClassesExtraRefType): this {
    this.classes.setExtraMain(data)
    return this
  }

  /**
   * Adding additional styles
   * Добавление дополнительных стилей
   * @param data list of additional styles / список дополнительных стилей
   */
  setExtraStyles (data: StylesRefType): this {
    this.styles.setExtra(data)
    return this
  }

  /**
   * Returns props
   *
   * Возвращает свойства (props)
   */
  getProps (): P {
    return this.props
  }

  /**
   * Add all component properties.
   * Are added automatically during build
   *
   * Добавление всех свойств компонента.
   * Добавляются автоматически во время сборки
   * @param properties
   */
  setProperties (properties: PropertiesListType): this {
    this.properties.set(properties)
    return this
  }

  /**
   * Changing the list of connected components
   *
   * Изменение списка подключенных компонентов
   * @param components list of connected components / список подключенных компонентов
   */
  setComponents (components: M): this {
    this.components.set(components)
    return this
  }

  getBind<T = any, R = AssociativeType> (value: Ref<T | R>): ComputedRef<R>
  getBind<T = any, R = AssociativeType> (value: Ref<T | R>, name: string): ComputedRef<R>
  getBind<T = any, R = AssociativeType> (value: Ref<T | R>, extra: RefOrNormalType<AssociativeType>): ComputedRef<R>
  getBind<T = any, R = AssociativeType> (value: Ref<T | R>, extra: RefOrNormalType<AssociativeType>, name: string): ComputedRef<R>
  /**
   * A method for generating properties for a subcomponent
   *
   * Метод для генерации свойств для под компонента
   * @param value input value. Can be an object if you need to pass multiple
   * properties / входное значение. Может быть объектом, если надо передать
   * несколько свойств
   * @param nameExtra additional parameter or property name / дополнительный параметр или имя свойства
   * @param name property name / имя свойства
   */
  getBind<T = any, R = AssociativeType> (
    value: Ref<T | R>,
    nameExtra: RefOrNormalType<AssociativeType> | string = {},
    name = 'value' as string
  ): ComputedRef<R> {
    return Design.getBindStatic<T, R>(
      value,
      nameExtra,
      name
    )
  }

  /**
   * A method for generating properties for a subcomponent
   *
   * Метод для генерации свойств для под компонента
   * @param value input value. Can be an object if you need to pass multiple
   * properties / входное значение. Может быть объектом, если надо передать
   * несколько свойств
   * @param nameExtra additional parameter or property name / дополнительный параметр или имя свойства
   * @param name property name / имя свойства
   */
  static getBindStatic<T = any, R = AssociativeType> (
    value: Ref<T | R>,
    nameExtra: RefOrNormalType<AssociativeType> | string = {},
    name = 'value' as string
  ): ComputedRef<R> {
    return computed(() => {
      const isName = typeof nameExtra === 'string'
      const index = isName ? nameExtra : name
      const extra = isName ? {} : getRef(nameExtra)

      if (
        value.value &&
        typeof value.value === 'object' &&
        index in value.value
      ) {
        return {
          ...extra,
          ...value.value
        } as R
      } else {
        return {
          ...extra,
          [index]: value.value
        } as R
      }
    })
  }

  /**
   * Returns the basic data processed in setup
   *
   * Возвращает базовые данные, обрабатываемые в setup
   */
  getSetup (): DesignSetupType<C, E, AssociativeType, I> {
    return this.setupItem as DesignSetupType<C, E, AssociativeType, I>
  }

  /**
   * Initializes the slot
   *
   * Инициализирует слот
   * @param name slot name / название слота
   * @param children if you pass this element, the slot will be added to it / если передать
   * @param props property for the slot / свойство для слота
   * этот элемент, то слот добавится в него
   */
  initSlot (
    name: DesignSlotNamesType<S>,
    children?: any[],
    props: DesignPropsType = {}
  ): VNode | undefined {
    const slots = this.context.slots

    if (
      slots?.[name] &&
      typeof slots[name] === 'function'
    ) {
      const slot = (slots[name] as ((props?: DesignPropsType) => VNode))(props)

      if (children) {
        children.push(slot)
      }

      return slot
    }

    return undefined
  }

  /**
   * Execution method to replace setup in Vue
   *
   * Метод выполнения, для замены setup в Vue
   * @param dataCallback additional component properties / дополнительные свойства компонента
   */
  setup<D = AssociativeType> (dataCallback?: DesignSetupValueType<D>): DesignSetupType<C, E, D, I> {
    this.initSetupItem()

    return {
      ...(this.getSetup()),
      ...(executeFunction(dataCallback) || ({} as D))
    }
  }

  /**
   * The rendering method for the setup method
   *
   * Метод рендеринга для метода настройки
   */
  render (): () => VNode {
    this.initSetupItem()

    return () => this.initRender()
  }

  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): I {
    return {} as I
  }

  /**
   * Initialization of all the necessary properties for work
   *
   * Инициализация всех необходимых свойств для работы
   * @protected
   */
  protected initSetupItem (): void {
    if (!this.setupItem) {
      this.setupItem = {
        element: this.element,
        classes: this.classes.getItem() as ComputedRef<ClassesListType<C>>,
        styles: this.styles.getItem(),
        ...this.init()
      }
    }
  }

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  protected initRender (): VNode {
    return h('div', { class: this.setupItem?.classes.value.main })
  }

  /**
   * Checks the values of the input context and converts them to the required format
   *
   * Проверяет значения входного context и преобразует в нужный формат
   * @param contextEmit checked values / проверяемые значения
   * @protected
   */
  protected initContext (contextEmit?: DesignSetupContextType<O, S> | DesignSetupContextType<O, S>['emit']): DesignSetupContextType<O, S> {
    if (
      contextEmit &&
      typeof contextEmit === 'object' &&
      'attrs' in contextEmit &&
      'slots' in contextEmit
    ) {
      return contextEmit
    } else {
      return {
        attrs: useAttrs(),
        slots: useSlots(),
        emit: contextEmit || ((name: string, ...agr: any[]) => console.error(name, agr)),
        expose: defineExpose
      } as DesignSetupContextType<O, S>
    }
  }
}
