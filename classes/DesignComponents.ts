import { h, VNode } from 'vue'

export type DesignComponentsType = Record<string, any>

/**
 * Class for working with connected components
 *
 * Класс для работы с подключенными компонентами
 */
export class DesignComponents<M extends DesignComponentsType = DesignComponentsType> {
  protected item = {} as M

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
   * Rendering the component by its name
   *
   * Рендеринг компонента по его имени
   * @param item an array to which the rendered object will be added / массив, по
   * которому будет добавлять объект
   * @param name name of the component / названия компонента
   * @param props property of the component / свойство компонента
   * @param children sub-elements of the component / под элементы компонента
   */
  render<K extends keyof M> (
    item: any[],
    name: K,
    props?: M[K],
    children?: any[]
  ): this {
    item.push(...this.renderItem(name, props, children))

    return this
  }

  /**
   * Rendering a component by its name and returning an array with one component
   *
   * Рендеринг компонента по его имени и возвращение массива с одним компонентом
   * @param name name of the component / названия компонента
   * @param props property of the component / свойство компонента
   * @param children sub-elements of the component / под элементы компонента
   */
  renderItem<K extends keyof M> (
    name: K,
    props?: M[K],
    children?: any[]
  ): VNode[] {
    if (this.is(name)) {
      return [h(this.get(name), props, children)]
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
}
