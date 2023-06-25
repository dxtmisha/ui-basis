import { ComputedRef, ref, SetupContext } from 'vue'
import { executeFunction } from '../functions/data'

import { AssociativeType } from '../constructors/types'
import { DesignProperties, PropertiesListType } from './DesignProperties'
import {
  DesignClasses,
  ClassesListType,
  ClassesSubClassesType,
  ClassesExtraListType,
  ClassesExtraItemType
} from './DesignClasses'
import { DesignStyles, StylesListType } from './DesignStyles'

export interface DesignSetupBasic<C> {
  classes: ComputedRef<ClassesListType<C>>
  styles: ComputedRef<StylesListType>
}

export type DesignProps = Record<string, any>
export type DesignSetupValue<D = AssociativeType> = D | (() => D)
export type DesignSetup<C, D = AssociativeType> = DesignSetupBasic<C> & D

/**
 * Main class for binding tokens and Vue components
 *
 * Основной класс для связывания токенов и компонентов Vue
 */
export class Design<
  C extends ClassesSubClassesType = ClassesSubClassesType,
  P extends DesignProps = DesignProps
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

  /**
   * Constructor
   * @param props properties / свойства
   * @param context additional property / дополнительное свойство
   */
  constructor (
    protected readonly props: P,
    protected readonly context: SetupContext
  ) {
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
  setup<D = AssociativeType> (dataCallback?: DesignSetupValue<D>): DesignSetup<C, D> {
    return {
      classes: this.classes.getItem() as ComputedRef<ClassesListType<C>>,
      styles: this.styles.getItem(),
      ...(executeFunction(dataCallback) || ({} as D))
    }
  }
}
