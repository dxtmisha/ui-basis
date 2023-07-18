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
      return [this.getNode(this.get(name), props, children, name as string)]
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
