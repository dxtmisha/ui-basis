import {
  ComputedRef,
  h,
  Ref,
  ref,
  SetupContext,
  ToRefs,
  toRefs,
  VNode
} from 'vue'
import { executeFunction } from '../functions/data'
import { To } from './To'

import { DesignProperties, PropertiesListType } from './DesignProperties'
import {
  DesignClasses,
  ClassesListType,
  ClassesSubClassesType,
  ClassesExtraListType,
  ClassesExtraItemType
} from './DesignClasses'
import { DesignStyles, StylesListType } from './DesignStyles'

import { AssociativeType, ElementType } from '../constructors/types'

export interface DesignSetupBasicInterface<C, E> {
  element: Ref<E | undefined>
  classes: ComputedRef<ClassesListType<C>>
  styles: ComputedRef<StylesListType>
}

export type DesignPropsType = Record<string, any>
export type DesignPropsValueType<T = []> = Record<keyof T, any> & DesignPropsType
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
  P extends DesignPropsType = DesignPropsType,
  I extends DesignPropsType = DesignPropsType
> {
  /**
   * Class name
   *
   * Название класса
   * @protected
   */
  protected name = ref<string>('design-component')

  protected properties: DesignProperties
  protected classes: DesignClasses<C>
  protected styles: DesignStyles

  protected element = ref<E>()
  protected refs: ToRefs<P>

  /**
   * Constructor
   * @param props properties / свойства
   * @param context additional property / дополнительное свойство
   */
  constructor (
    protected readonly props: P,
    protected readonly context: SetupContext
  ) {
    this.refs = toRefs(props)
    this.properties = new DesignProperties()

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
  setExtraMain (data: ClassesExtraItemType): this {
    this.classes.setExtraMain(data)
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
   * Returns the names of the user properties
   *
   * Возвращает название пользовательского свойства
   * @param names class name / название класса
   */
  getNameByVar (names: string | string[]) {
    return `--${this.getName()}${names.length > 0 ? `-${To.array(names).join('-')}` : ''}`
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
   * Execution method to replace setup in Vue
   *
   * Метод выполнения, для замены setup в Vue
   * @param dataCallback additional component properties / дополнительные свойства компонента
   */
  setup<D = AssociativeType> (dataCallback?: DesignSetupValueType<D>): DesignSetupType<C, E, D, I> {
    return {
      element: this.element,
      classes: this.classes.getItem() as ComputedRef<ClassesListType<C>>,
      styles: this.styles.getItem(),
      ...this.init(),
      ...(executeFunction(dataCallback) || ({} as D))
    }
  }

  /**
   * The rendering method for the setup method
   *
   * Метод рендеринга для метода настройки
   * @param dataCallback additional component properties / дополнительные свойства компонента
   */
  render<D = AssociativeType> (dataCallback?: DesignSetupValueType<D>): () => VNode {
    const setup = this.setup<D>(dataCallback)

    return () => this.initRender<D>(setup)
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
   * A method for rendering
   *
   * Метод для рендеринга
   * @param setup the result of executing the setup method / результат выполнения метода настройки
   * @protected
   */
  protected initRender<D = AssociativeType> (setup: DesignSetupType<C, E, D, I>): VNode {
    return h('div', { class: setup.classes.value.main })
  }
}
