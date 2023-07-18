import { h, onBeforeMount, onUnmounted, ref, VNode, watch } from 'vue'
import { getIdElement } from '../../functions/element'

import {
  Design,
  DesignSetupContextEmitType
} from '../../classes/Design'
import { ClassesSubClassesType } from '../../classes/DesignClasses'

import { subClassesMutation } from './props'

import {
  MutationComponentsInterface,
  MutationEmitsType,
  MutationInitInterface,
  MutationPropsValueType,
  MutationSlotsType
} from './types'
import { MutationControl, MutationControlInterface } from './MutationControl'

// [!] System label, cannot be deleted
// [!] Системная метка, нельзя удалять
// :components-import
// :components-import

/**
 * MutationDesign
 */
export class MutationDesign<
  C extends ClassesSubClassesType = typeof subClassesMutation,
  P extends MutationPropsValueType = MutationPropsValueType
> extends Design<
  C,
  HTMLDivElement,
  P,
  MutationInitInterface,
  MutationComponentsInterface,
  MutationEmitsType,
  MutationSlotsType
> {
  protected item = ref<MutationControlInterface>()
  protected list = ref<HTMLElement[]>()

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
    contextEmit?: DesignSetupContextEmitType<MutationEmitsType, MutationSlotsType>
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
  protected init (): MutationInitInterface {
    onBeforeMount(() => this.collect())
    onUnmounted(() => this.disconnect())

    return {
      item: this.item,
      list: this.list
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

    this.list.value?.forEach(element => {
      this.components.render(
        children,
        'mutationItem',
        { element },
        undefined,
        getIdElement(element)
      )
    })

    return h('div', {
      ref: this.element,
      class: this.setupItem?.classes.value.main
    }, children)
  }

  /**
   * Beginning of initialization for tracking and searching the element
   *
   * Начало инициализации за слежения и поиска элемента
   * @protected
   */
  protected collect () {
    this.item.value = MutationControl.registration(this.getNameDesign())

    if (this.item.value) {
      watch(this.item.value?.list, list => {
        this.list.value = [...list]
      }, { immediate: true })
    }
  }

  /**
   * Termination of observation of changes
   *
   * Прекращения наблюдения за изменения
   * @protected
   */
  protected disconnect (): this {
    MutationControl.disconnect(this.getNameDesign())
    return this
  }
}
