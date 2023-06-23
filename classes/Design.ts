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
  protected name = ref<string>('design-component')
  protected properties: DesignProperties
  protected classes: DesignClasses

  /**
   * Constructor
   * @param props свойства
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
   * Returns props
   *
   * Возвращает свойства (props)
   */
  getProps (): P {
    return this.props
  }

  getName (): string {
    return this.name.value
  }

  /**
   * Component names.
   * Are added automatically during build
   *
   * Названия компонентов.
   * Добавляются автоматически во время сборки
   * @param name
   */
  setName (name: string): this {
    this.name.value = name
    return this
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

  setup<D = AssociativeType> (dataCallback?: DesignSetupValue<D>): DesignSetup<D> {
    return {
      classes: this.classes.get(),
      ...(executeFunction(dataCallback) || ({} as D))
    }
  }
}
