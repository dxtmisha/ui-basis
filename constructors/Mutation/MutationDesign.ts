import { h, onBeforeMount, onUnmounted, ref, VNode, watch } from 'vue'
import { getIdElement } from '../../functions/element'

import {
  ConstrEmitType,
  ConstrItemType,
  ConstrOptionsInterface,
  DesignConstructor
} from '../../classes/DesignConstructor'

import { MutationControl, MutationControlInterface } from './MutationControl'
import { MutationItemControlInterface } from '../MutationItem/MutationItemControl'

import {
  MutationComponentsInterface,
  MutationEmitsType,
  MutationSetupInterface
} from './types'
import { PropsMutationType, subclassesMutation } from './props'

/**
 * MutationDesign
 */
export class MutationDesign<
  SETUP extends MutationSetupInterface,
  EXPOSE extends ConstrItemType,
  P extends PropsMutationType,
  S extends typeof subclassesMutation,
  C extends MutationComponentsInterface
> extends DesignConstructor<
  HTMLElement,
  SETUP,
  ConstrItemType,
  MutationEmitsType,
  EXPOSE,
  P,
  S,
  C
> {
  protected item = ref<MutationControlInterface>()
  protected list = ref<HTMLElement[]>()

  /**
   * Constructor
   * @param name class name / название класса
   * @param props properties / свойства
   * @param options list of additional parameters / список дополнительных параметров
   * @param emits function for calling an event / функция для вызова события
   */
  constructor (
    name: string,
    props?: Readonly<P>,
    options?: ConstrOptionsInterface<P, S, C>,
    emits?: ConstrEmitType<MutationEmitsType>
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
      list: this.list
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

    this.list.value?.forEach(element => {
      this.components?.renderAdd(
        children,
        'mutationItem',
        {
          element,
          onLoad: (item: MutationItemControlInterface) => this.emits?.('load', item)
        },
        undefined,
        getIdElement(element)
      )
    })

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
  protected collect () {
    this.item.value = MutationControl.registration(this.getDesignName())

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
    MutationControl.disconnect(this.getDesignName())
    return this
  }
}
