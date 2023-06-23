import { computed, ComputedRef, ref, Ref } from 'vue'
import { executeFunction, forEach } from '../functions/data'
import { getRef } from '../functions/ref'

import {
  DesignProperties,
  PropertiesItemType,
  PropertiesStateType
} from './DesignProperties'
import {
  AssociativeType,
  CallbackOrAnyType
} from '../constructors/types'
import { RefOrNormalType } from '../constructors/typesRef'

export type ClassesItemType = AssociativeType<boolean>
export type ClassesListType = { main: ClassesItemType } & AssociativeType<ClassesItemType>

export type ClassesExtraType = CallbackOrAnyType<RefOrNormalType<boolean>>
export type ClassesExtraItemType = AssociativeType<ClassesExtraType>
export type ClassesExtraListType = AssociativeType<ClassesExtraItemType>

/**
 * Class for working with classes in a component
 *
 * Класс для работы с классами в компоненте
 */
export class DesignClasses {
  protected readonly extra = ref<ClassesExtraListType>({})

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly name: Ref<string>,
    protected readonly properties: DesignProperties,
    protected readonly props: AssociativeType
  ) {
  }

  get (): ComputedRef<ClassesListType> {
    return this.classes
  }

  getName (): string {
    return this.name.value || 'design-component'
  }

  setExtra (data: ClassesExtraListType): this {
    this.extra.value = data
    return this
  }

  setExtraMain (data: ClassesExtraItemType): this {
    this.extra.value.main = data
    return this
  }

  protected classes = computed<ClassesListType>(() => {
    return {
      main: {
        ...this.classesMain.value,
        ...this.classesProperties.value
      }
    }
  })

  /**
   * An object containing all the classes for working with basic data types.
   *
   * Объект, содержащий все классы для работы с базовыми типами данных.
   * @protected
   */
  protected classesMain = computed<ClassesItemType>(() => {
    return {
      [this.getName()]: true,
      ...this.getExtraByName('main')
    }
  })

  /**
   * List of active state classes
   *
   * Список активных классов состояний
   * @protected
   */
  protected classesProperties = computed<ClassesItemType>(() => {
    const name = this.getName()
    const data: ClassesItemType = {}

    this.properties.get()?.forEach(item => {
      Object.assign(data, this.toClassName(item))

      /*
      const prop = this.props?.[item.name]
      const is = this.properties.isValue(item.name, prop)
      const className = `${name}--${item.index}`

      if (is || this.properties.isStyle(item.name, prop)) {
        if (prop === true || this.properties.isBool(item.name)) {
          data[`${className}`] = true
        }

        if (is && typeof prop === 'string') {
          data[`${className}--${prop}`] = true
        }
      }
      */
    })

    return data
  })

  /**
   * Returns additional parameters by their name
   *
   * Возвращает дополнительные параметры по их имени
   * @param name element name / имя элемента
   * @protected
   */
  protected getExtraByName (name: string): AssociativeType<boolean> {
    const extra: AssociativeType<boolean> = {}

    forEach(this.extra.value?.[name], (item, index) => {
      extra[index] = getRef(executeFunction(item))
    })

    return extra
  }

  protected toClassName (
    item: PropertiesItemType | PropertiesStateType,
    className: string = this.getName()
  ) {
    const prop = this.props?.[item.name]
    const is = this.properties.isValue(item, prop)
    const data: ClassesItemType = {}

    if (
      (
        is &&
        prop === true
      ) || (
        this.properties.isStyle(item, prop)
      )
    ) {
      this.toClassNameByState(data, item, className)
    }

    if (
      is &&
      typeof prop === 'string'
    ) {
      data[`${className}--${item.index}--${prop}`] = true
    }

    return data
  }

  protected toClassNameByState (
    data: ClassesItemType,
    item: PropertiesItemType | PropertiesStateType,
    className: string
  ) {
    data[`${className}--${item.index}`] = true

    item.state?.forEach(state => {
      Object.assign(
        data,
        this.toClassName(state, `${className}--${item.index}`)
      )
    })
  }
}
