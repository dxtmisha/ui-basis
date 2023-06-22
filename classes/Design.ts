import { ComponentObjectPropsOptions, SetupContext } from 'vue'

import { AssociativeType } from '../constructors/types'
import { executeFunction } from '../functions/data'

export interface DesignPropertiesItem {
  name: string,
  value: (string | boolean)[],
  style?: boolean,
  default?: boolean
}

export type DesignProperties = DesignPropertiesItem[]

export type DesignClassesItem = AssociativeType<boolean> | string
export type DesignStylesItem = AssociativeType<string> | string

export interface DesignClasses {
  main: DesignClassesItem
}

export interface DesignStyles {
  main: DesignStylesItem
}

export interface DesignSetupBasic {
  classes: DesignClasses
}

export type DesignSetupValue<D = AssociativeType, T = any> = D | ((this: T) => D)
export type DesignSetup<D = AssociativeType> = DesignSetupBasic & D

/**
 * Main class for binding tokens and Vue components
 *
 * Основной класс для связывания токенов и компонентов Vue
 */
export class Design<P = ComponentObjectPropsOptions> {
  protected name ?: string
  protected properties?: DesignProperties

  /**
   * Constructor
   * @param props свойства
   * @param context additional property / дополнительное свойство
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly props: P,
    protected readonly context: SetupContext
  ) {
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
   * Component names.
   * Are added automatically during build
   *
   * Названия компонентов.
   * Добавляются автоматически во время сборки
   * @param name
   */
  setName (name: string): this {
    this.name = name
    return this
  }

  /**
   * Add all component properties
   *
   * Добавление всех свойств компонента
   * @param properties
   */
  setProperties (properties: DesignProperties): this {
    this.properties = properties
    return this
  }

  setup<D = AssociativeType> (dataCallback?: DesignSetupValue<D>): DesignSetup<D> {
    // TODO: Close

    console.log('dataCallback', dataCallback)

    return {
      classes: {
        main: 'is-class'
      },
      ...(executeFunction(dataCallback) || ({} as D))
    }
  }
}
