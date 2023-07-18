import { h, onBeforeMount, onUnmounted, ref, resolveComponent, Teleport, VNode, withCtx } from 'vue'
import { forEach } from '../../functions/data'

import { Design } from '../../classes/Design'
import { ClassesSubClassesType } from '../../classes/DesignClasses'

import { subClassesMutationItem } from './props'

import {
  MutationItemEmitsType,
  MutationItemInitInterface,
  MutationItemPropsValueType,
  MutationItemSlotsType
} from './types'

import {
  MutationItemChildrenListType,
  MutationItemControl,
  MutationItemControlInterface
} from './MutationItemControl'

// [!] System label, cannot be deleted
// [!] Системная метка, нельзя удалять
// :components-import
// :components-import

/**
 * MutationItemDesign
 */
export class MutationItemDesign<
  C extends ClassesSubClassesType = typeof subClassesMutationItem,
  P extends MutationItemPropsValueType = MutationItemPropsValueType
> extends Design<
  C,
  HTMLDivElement,
  P,
  MutationItemInitInterface,
  Record<string, any>,
  MutationItemEmitsType,
  MutationItemSlotsType
> {
  protected item = ref<MutationItemControlInterface>()
  protected children = ref<Record<string, any> | undefined>(undefined)

  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :components-variable
  // :components-variable

  /**
   * Method for generating additional properties
   *
   * Метод для генерации дополнительных свойств
   * @protected
   */
  protected init (): MutationItemInitInterface {
    onBeforeMount(() => this.collect())
    onUnmounted(() => this.disconnect())

    return {
      item: this.item,
      children: this.children
    }
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
      class: this.setupItem?.classes.value.main
    }, children)
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
   * Beginning of initialization for tracking and searching the element
   *
   * Начало инициализации за слежения и поиска элемента
   * @protected
   */
  protected collect (): this {
    if (this.props.element) {
      this.item.value = MutationItemControl.registration(this.props.element)
      this.children.value = this.initChildren(this.item.value?.children)

      this.emit('load', this.item.value)
    }

    return this
  }

  /**
   * Termination of observation of changes
   *
   * Прекращения наблюдения за изменения
   * @protected
   */
  protected disconnect (): this {
    if (this.props.element) {
      MutationItemControl.disconnect(this.props.element)
    }

    return this
  }
}
