import { ComponentObjectPropsOptions, ComputedRef, ref, SetupContext } from 'vue'
import { executeFunction } from '../functions/data'

import { AssociativeType } from '../constructors/types'
import { DesignProperties, PropertiesListType } from './DesignProperties'
import { DesignClasses, ClassesListType } from './DesignClasses'

export interface DesignSetupBasic {
  classes: ComputedRef<ClassesListType>
}

export type DesignSetupValue<D = AssociativeType> = D | (() => D)
export type DesignSetup<D = AssociativeType> = DesignSetupBasic & D

/**
 * Main class for binding tokens and Vue components
 *
 * Основной класс для связывания токенов и компонентов Vue
 */
export class Design<P = ComponentObjectPropsOptions> {
  /**
   * Class name
   *
   * Название класса
   * @protected
   */
  protected name = ref<string>('design-component')

  protected properties: DesignProperties
  protected classes: DesignClasses

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
    this.classes = new DesignClasses(
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
  setup<D = AssociativeType> (dataCallback?: DesignSetupValue<D>): DesignSetup<D> {
    return {
      classes: this.classes.getItem(),
      ...(executeFunction(dataCallback) || ({} as D))
    }
  }
}
