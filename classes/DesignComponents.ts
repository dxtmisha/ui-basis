import { DefineComponent, h, Ref, ref } from 'vue'

export type DesignComponentsType = Record<string, DefineComponent>

/**
 * Class for working with connected components
 *
 * Класс для работы с подключенными компонентами
 */
export class DesignComponents<M extends DesignComponentsType = DesignComponentsType> {
  protected item = ref<M>({} as M) as Ref<M>

  /**
   * Check the presence of the component
   *
   * Проверить наличие компонента
   * @param name name of the component / названия компонента
   */
  is<K extends keyof M> (name: K): name is K {
    return name in this.item.value
  }

  /**
   * Getting the object of the component
   *
   * Получение объекта компонента
   * @param name name of the component / названия компонента
   */
  get<K extends keyof M> (name: K): M[K] {
    return this.item.value?.[name]
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
    props?: Record<string, any>,
    children?: any[]
  ) {
    if (this.is(name)) {
      item.push(h(this.get(name), props, children))
    }

    return this
  }

  /**
   * Changing the list of connected components
   *
   * Изменение списка подключенных компонентов
   * @param components list of connected components / список подключенных компонентов
   */
  set (components: M): this {
    this.item.value = components
    return this
  }
}
