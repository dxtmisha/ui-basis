import { computed, ComputedRef, h, Ref, VNode } from 'vue'
import { getRef } from './ref'

import { RefOrNormalType } from '../constructors/typesRef'

/**
 * Returns the name of the class from the property
 *
 * Возвращает название класса из свойства
 * @param props property of the component / свойство компонента
 * @private
 */
export function getClassName (props?: Record<string, any>): string | undefined {
  return props && 'class' in props && typeof props.class === 'string' ? props.class : undefined
}

/**
 * Returns or generates a new element
 *
 * Возвращает или генерирует новый элемент
 * @param name name of the component / названия компонента
 * @param props property of the component / свойство компонента
 * @param index the name of the key / названия ключа
 * @private
 */
export function getIndex (
  name: string,
  props?: Record<string, any>,
  index?: string
) {
  const className = getClassName(props)

  if (index && className) {
    return `${index}.${className}`
  } else if (index) {
    return index
  } else if (className) {
    return className
  } else {
    return name
  }
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
export function getBind<T, R extends Record<string, any>> (
  value: Ref<T | R> | undefined,
  nameExtra: RefOrNormalType<Record<string, any>> | string = {},
  name = 'value'
): ComputedRef<R> {
  return computed(() => {
    const isName = typeof nameExtra === 'string'
    const index = isName ? nameExtra : name
    const extra = isName ? {} : getRef(nameExtra)

    if (value) {
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
    } else {
      return {} as R
    }
  })
}

/**
 * Getting cached, immutable data
 *
 * Получение кешированных, неизменяемых данных
 * @param name name of the component / названия компонента
 * @param props property of the component / свойство компонента
 * @param children sub-elements of the component / под элементы компонента
 * @param index the name of the key / названия ключа
 */
export function render (
  name: string,
  props?: Record<string, any>,
  children?: any[],
  index?: string
): VNode {
  const code = getIndex(name, props, index)

  return h(name, { key: code, ...props }, children)
}
