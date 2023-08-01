import { VNode } from 'vue'
import { forEach } from '../functions/data'
import { getRef } from '../functions/ref'
import { render } from '../functions/render'

import { RefOrNormalType } from '../constructors/typesRef'

export type ComponentsType = Record<string, any>
export type ComponentsModificationType<P extends Record<string, any>> = Record<keyof P, RefOrNormalType>

/**
 * Class for working with connected components
 *
 * Класс для работы с подключенными компонентами
 */
export class DesignComponents<
  C extends ComponentsType,
  P extends Record<string, any>
> {
  /**
   * Constructor
   * @param components list of connected components / список подключенных компонентов
   * @param modification data for modification / данные для модификации
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly components: C,
    protected readonly modification?: ComponentsModificationType<P>
  ) {
  }

  /**
   * Check the presence of the component
   *
   * Проверить наличие компонента
   * @param name name of the component / названия компонента
   */
  is<K extends keyof C> (name: K): name is K {
    return name in this.components
  }

  /**
   * Getting the object of the component
   *
   * Получение объекта компонента
   * @param name name of the component / названия компонента
   */
  get<K extends keyof C> (name: K): C[K] {
    return this.components?.[name]
  }

  /**
   * Returns the modified input data of the connected components
   *
   * Возвращает модифицированные входные данные у подключенных компонентов
   * @param index the name of this / название данного
   * @param props basic data / базовые данные
   */
  getModification (index?: string, props?: Record<string, any>): Record<string, any> | undefined {
    if (
      index &&
      this.modification &&
      this.modification?.[index]
    ) {
      const value: Record<string, any> = {}

      forEach(this.modification[index], (item, name) => {
        value[name] = getRef(item)
      })

      if (props) {
        Object.assign(value, props)
      }

      return value
    } else {
      return props
    }
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
  render<K extends keyof C> (
    name: K & string,
    props?: C[K] & Record<string, any>,
    children?: any[],
    index?: string
  ): VNode[] {
    if (this.is(name)) {
      return [
        render(
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
  renderAdd<K extends keyof C> (
    item: any[],
    name: K & string,
    props?: C[K] & Record<string, any>,
    children?: any[],
    index?: string
  ): this {
    item.push(...this.render(name, props, children, index))

    return this
  }
}
