import { computed, h, onBeforeMount, onUnmounted, ref, resolveComponent, VNode } from 'vue'

import {
  Design,
  DesignSetupContextEmitType
} from '../../classes/Design'
import { ClassesSubClassesType } from '../../classes/DesignClasses'

import { subClassesMutationItem } from './props'

import {
  MutationItemEmitsType,
  MutationItemInitInterface,
  MutationItemPropsValueType,
  MutationItemSlotsType
} from './types'
import { MutationItemControl, MutationItemControlInterface } from './MutationItemControl'

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

  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :components-variable
  // :components-variable

  /**
   * Constructor
   * @param props properties / свойства
   * @param contextEmit additional property / дополнительное свойство
   */
  constructor (
    protected readonly props: P,
    contextEmit?: DesignSetupContextEmitType<MutationItemEmitsType, MutationItemSlotsType>
  ) {
    super(props, contextEmit)

    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :components-init
    // :components-init
  }

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
      tag: this.tag,
      binds: this.binds
    }
  }

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  protected initRender (): VNode {
    const setup = this.getSetup()
    const component = resolveComponent(this.item.value?.name || 'div')
    const children: any[] = []

    if (this.item.value) {
      children.push(h(
        component,
        this.item.value?.binds
      ))
    }

    return h('div', {
      ref: this.element,
      class: setup.classes.value.main
    }, children)
  }

  protected tag = computed<string>(() => this.item.value?.name || 'div')

  protected binds = computed<Record<string, any> | undefined>(
    () => {
      console.info(this.item.value?.binds?.value)
      return this.item.value?.binds?.value
    }
  )

  /**
   * Beginning of initialization for tracking and searching the element
   *
   * Начало инициализации за слежения и поиска элемента
   * @protected
   */
  protected collect (): this {
    if (this.props.element) {
      this.item.value = MutationItemControl.registration(this.props.element)
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
