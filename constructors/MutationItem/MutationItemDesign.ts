import { h, onBeforeMount, onUnmounted, ref, resolveComponent, Teleport, VNode, withCtx } from 'vue'
import { forEach } from '../../functions/data'

import {
  ConstrEmitType,
  ConstrItemType,
  ConstrOptionsInterface,
  DesignConstructor
} from '../../classes/DesignConstructor'

import { MutationItemChildrenListType, MutationItemControl, MutationItemControlInterface } from './MutationItemControl'

import {
  MutationItemEmitsType,
  MutationItemSetupInterface
} from './types'
import { PropsMutationItemType, subclassesMutationItem } from './props'

/**
 * MutationItemDesign
 */
export class MutationItemDesign<
  SETUP extends MutationItemSetupInterface,
  EXPOSE extends ConstrItemType,
  P extends PropsMutationItemType,
  S extends typeof subclassesMutationItem,
  C extends ConstrItemType
> extends DesignConstructor<
  HTMLElement,
  SETUP,
  ConstrItemType,
  MutationItemEmitsType,
  EXPOSE,
  P,
  S,
  C
> {
  protected item = ref<MutationItemControlInterface>()
  protected children = ref<Record<string, any> | undefined>(undefined)

  /**
   * Constructor
   * @param name class name / название класса
   * @param props properties / свойства
   * @param options list of additional parameters / список дополнительных параметров
   * @param emits function for calling an event / функция для вызова события
   */
  constructor (
    name: string,
    props: Readonly<P>,
    options?: ConstrOptionsInterface<P, S, C>,
    emits?: ConstrEmitType<MutationItemEmitsType>
  ) {
    super(
      name,
      props,
      options,
      emits
    )

    onBeforeMount(() => this.collect())
    onUnmounted(() => this.disconnect())

    this.init()
  }

  /**
   * Initialization of all the necessary properties for work
   *
   * Инициализация всех необходимых свойств для работы
   * @protected
   */
  protected initSetup (): SETUP {
    return {
      item: this.item,
      children: this.children
    } as SETUP
  }

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  protected initRender (): VNode {
    const children: any[] = []

    if (this.item.value) {
      children.push(h(
        Teleport,
        { to: `#${this.item.value.id}` },
        [h(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          resolveComponent(this.item.value.name),
          this.item.value.binds,
          this.children.value
        )]
      ))
    }

    return h('div', {
      ref: this.element,
      class: this.design?.getClasses().main
    }, children)
  }

  /**
   * Beginning of initialization for tracking and searching the element
   *
   * Начало инициализации за слежения и поиска элемента
   * @protected
   */
  protected collect (): this {
    if (this.props?.element) {
      this.item.value = MutationItemControl.registration(this.props.element)
      this.children.value = this.initChildren(this.item.value?.children)

      this.emits?.('load', this.item.value)
    }

    return this
  }

  /**
   * A method for generating an object for working with slots
   *
   * Метод для генерации объекта для работы со слотами
   * @param children an object with descendants / объект с потомками
   * @protected
   */
  protected initChildren (children?: Record<string, MutationItemChildrenListType>) {
    if (children) {
      const data: Record<string, any> = {}

      forEach(children, (item, index) => {
        data[index] = withCtx(() => {
          return forEach(item, child => {
            return typeof child === 'string' ? child : h(child.tag, child?.attributes)
          })
        })
      })

      return data
    }

    return undefined
  }

  /**
   * Termination of observation of changes
   *
   * Прекращения наблюдения за изменения
   * @protected
   */
  protected disconnect (): this {
    if (this.props?.element) {
      MutationItemControl.disconnect(this.props.element)
    }

    return this
  }
}
