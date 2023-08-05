import { computed } from 'vue'
import { forEach, isFilled } from '../functions/data'
import { getRef } from '../functions/ref'

import { DesignProperties } from './DesignProperties'

import { RefOrNormalType } from '../constructors/typesRef'

export type StylesType = Record<string, string> | undefined

export type StylesExtraInputType = RefOrNormalType<string | null>
export type StylesExtraListType = Record<string, StylesExtraInputType>
export type StylesExtraType = RefOrNormalType<StylesExtraListType>

/**
 * A class for working with user-defined values in a component
 *
 * Класс для работы с пользовательскими значениями в компоненте
 */
export class DesignStyles {
  /**
   * Constructor
   * @param name class name / название класса
   * @param props properties / свойства
   * @param properties list of available properties / список доступных свойств
   * @param extra additional styles / дополнительные стили
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly name: string,
    protected readonly props: Record<string, any>,
    protected readonly properties: DesignProperties,
    protected readonly extra?: StylesExtraType
  ) {
  }

  /**
   * List of all user-defined properties
   *
   * Список всех пользовательских свойств
   */
  styles = computed<StylesType>(() => {
    const data: StylesType = {
      ...this.main.value,
      ...this.additional.value
    }

    return isFilled(data) ? data : undefined
  })

  /**
   * List of main styles available through tokens
   *
   * Список основных стилей, доступных через токены
   * @private
   */
  private main = computed<StylesType>(() => {
    const data: StylesType = {}

    this.properties.get()
      .forEach(item => {
        const prop = this.props?.[item.name]

        if (this.properties.isStyle(item, prop)) {
          data[this.getCustomName(item.index)] = prop
        }
      })

    return data
  })

  /**
   * List of additional properties passed through the extra values
   *
   * Список дополнительных свойств, передаваемых через значения extra
   * @private
   */
  private additional = computed<StylesType>(() => {
    const data: StylesType = {}

    if (this.extra) {
      forEach<StylesExtraInputType, string, void>(
        getRef(this.extra),
        (extra, name) => {
          const value = getRef(extra)

          if (value) {
            data[this.getCustomName(name)] = value.toString()
          }
        }
      )
    }

    return data
  })

  /**
   * Returns a list of all user-defined properties
   *
   * Возвращает список всех пользовательских свойств
   */
  get (): StylesType {
    return this.styles.value
  }

  /**
   * Returns the name of the user-defined property
   *
   * Возвращает имя пользовательского свойства
   * @param name property name / название свойства
   * @private
   */
  private getCustomName (name: string): string {
    if (name.match(/^\?\?/)) {
      return name.replace(/^\?\?/, `--${this.name}-sys-`)
    } else {
      return name
    }
  }
}
