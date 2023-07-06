import { computed, ComputedRef, ref, Ref } from 'vue'

import { DesignProperties } from './DesignProperties'

import { AssociativeType } from '../constructors/types'
import { RefOrNormalType } from '../constructors/typesRef'
import { getRef } from '../functions/ref'

export type StylesListType = Record<string, string | null>
export type StylesRefType = RefOrNormalType<StylesListType>

/**
 * A class for working with user-defined values in a component
 *
 * Класс для работы с пользовательскими значениями в компоненте
 */
export class DesignStyles {
  /**
   * List of additional styles
   *
   * Список дополнительных стилей
   * @protected
   */
  protected readonly extra = ref<StylesRefType>()

  /**
   * Constructor
   * @param name class name / название класса
   * @param properties list of available properties / список доступных свойств
   * @param props properties / свойства
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly name: Ref<string>,
    protected readonly properties: DesignProperties,
    protected readonly props: AssociativeType
  ) {
  }

  /**
   * Returns a list of all user-defined properties
   *
   * Возвращает список всех пользовательских свойств
   */
  get (): StylesListType {
    return this.styles.value
  }

  /**
   * Returns a list of all user-defined properties
   *
   * Возвращает список всех пользовательских свойств
   */
  getItem (): ComputedRef<StylesListType> {
    return this.styles
  }

  /**
   * Returns the base class name
   *
   * Возвращает базовое название класса
   */
  getName (): string {
    return this.name.value || 'design-component'
  }

  /**
   * Adding additional styles
   *
   * Добавление дополнительных стилей
   * @param data list of additional classes / список дополнительных классов
   */
  setExtra (data: StylesRefType): this {
    this.extra.value = data
    return this
  }

  /**
   * List of all user-defined properties
   *
   * Список всех пользовательских свойств
   * @protected
   */
  protected styles = computed<StylesListType>(() => {
    const data: StylesListType = {}

    this.properties.get()?.forEach(item => {
      const prop = this.props?.[item.name]

      if (this.properties.isStyle(item, prop)) {
        data[this.getCustomName(item.index)] = prop
      }
    })

    return {
      ...data,
      ...getRef(this.extra.value || {})
    }
  })

  /**
   * Returns the name of the user-defined property
   *
   * Возвращает имя пользовательского свойства
   * @param name property name / название свойства
   * @private
   */
  private getCustomName (name: string): string {
    return `--${this.getName()}-sys-${name}`
  }
}
