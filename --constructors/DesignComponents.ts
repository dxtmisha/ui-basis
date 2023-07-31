import { h, ref, Ref, VNode } from 'vue'
import { executeFunction, forEach } from '../functions/data'
import { getRef } from '../functions/ref'

import { CallbackOrAnyType } from '../constructors/types'

export type DesignComponentsType = Record<string, any>
export type DesignComponentsModificationType<
  P extends Record<string, any> = Record<string, any>,
  M extends Record<string, any> = Record<string, any>,
  T extends CallbackOrAnyType = CallbackOrAnyType
> = P | Record<keyof M, T> | Record<string, T>

/**
 * Class for working with connected components
 *
 * Класс для работы с подключенными компонентами
 */
export class DesignComponents<
  M extends DesignComponentsType = DesignComponentsType,
  MM extends DesignComponentsModificationType = DesignComponentsModificationType
> {
  protected item = {} as M
  protected readonly modification = ref({} as MM) as Ref<MM>

  /**
   * Check the presence of the component
   *
   * Проверить наличие компонента
   * @param name name of the component / названия компонента
   */
  is<K extends keyof M> (name: K): name is K {
    return name in this.item
  }

  /**
   * Getting the object of the component
   *
   * Получение объекта компонента
   * @param name name of the component / названия компонента
   */
  get<K extends keyof M> (name: K): M[K] {
    return this.item?.[name]
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
  getNode (
    name: string,
    props?: Record<string, any>,
    children?: any[],
    index?: string
  ): VNode {
    const code = this.getIndex(name, props, index)

    return h(name, { key: code, ...props }, children)
  }

  /**
   * Returns or generates a new element
   *
   * Возвращает или генерирует новый элемент
   * @param name name of the component / названия компонента
   * @param props property of the component / свойство компонента
   * @param index the name of the key / названия ключа
   * @protected
   */
  protected getIndex (
    name: string,
    props?: Record<string, any>,
    index?: string
  ) {
    const className = this.getClassName(props)

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
   * Returns the name of the class from the property
   *
   * Возвращает название класса из свойства
   * @param props property of the component / свойство компонента
   * @protected
   */
  protected getClassName (props?: Record<string, any>): string | undefined {
    return props && 'class' in props && typeof props.class === 'string' ? props.class : undefined
  }

  /**
   * Rendering the component by its name
   *
   * Рендеринг компонента по его имени
   * @param item an array to which the rendered object will be added / массив, по
   * которому будет добавлять объект
   * @param name name of the component / названия компонента
   * @param props property of the component / свойство компонента
   * @param children sub-elements of the component / под элементы компонента
   * @param index the name of the key / названия ключа
   */
  render<K extends keyof M> (
    item: any[],
    name: K & string,
    props?: M[K] & Record<string, any>,
    children?: any[],
    index?: string
  ): this {
    item.push(...this.renderItem(name, props, children, index))

    return this
  }

  /**
   * Rendering a component by its name and returning an array with one component
   *
   * Рендеринг компонента по его имени и возвращение массива с одним компонентом
   * @param name name of the component / названия компонента
   * @param props property of the component / свойство компонента
   * @param children sub-elements of the component / под элементы компонента
   * @param index the name of the key / названия ключа
   */
  renderItem<K extends keyof M> (
    name: K & string,
    props?: M[K] & Record<string, any>,
    children?: any[],
    index?: string
  ): VNode[] {
    if (this.is(name)) {
      return [
        this.getNode(
          this.get(name),
          this.getModification(index, props),
          children,
          index || (name as string)
        )
      ]
    }

    return []
  }

  /**
   * Changing the list of connected components
   *
   * Изменение списка подключенных компонентов
   * @param components list of connected components / список подключенных компонентов
   */
  set (components: M): this {
    this.item = components
    return this
  }

  /**
   * Returns the modified input data of the connected components
   *
   * Возвращает модифицированные входные данные у подключенных компонентов
   * @param index the name of this / название данного
   * @param props базовый данный
   */
  getModification (index?: string, props?: Record<string, any>): Record<string, any> | undefined {
    if (index && index in this.modification.value) {
      const value: Record<string, any> = {}

      forEach(this.modification.value[index], (item, name) => {
        value[name] = getRef(executeFunction(item))
      })

      return {
        ...value,
        ...(props || {})
      }
    } else {
      return props
    }
  }

  /**
   * Changes data for modification of input data of connected components
   *
   * Изменяет данные для модификации входных данных у подключенных компонентов
   * @param modification data for modification / данные для модификации
   */
  setModification (modification: MM): this {
    this.modification.value = modification
    return this
  }
}
