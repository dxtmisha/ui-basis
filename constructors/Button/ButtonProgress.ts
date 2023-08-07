import { ComputedRef, PropType, toRefs, VNode } from 'vue'
import { getBind } from '../../functions/render'

import { DesignComponents } from '../../classes/DesignComponents'
import { PropsProgressType } from '../Progress/props'

export type ButtonProgressComponentsType = {
  progress?: object
}

export type PropsButtonProgressType = {
  progress?: PropsProgressType | boolean
}

export const propsButtonProgress = {
  progress: [Boolean, Object] as PropType<PropsButtonProgressType['progress']>
}

/**
 * ButtonProgress
 */
export class ButtonProgress {
  readonly bind: ComputedRef<PropsProgressType>

  /**
   * Constructor
   * @param props input parameter / входной параметр
   * @param components object for working with components / объект для работы с компонентами
   * @param classesName class name for the component / название класса для компонента
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly props: PropsButtonProgressType,
    protected readonly components?: DesignComponents<ButtonProgressComponentsType, PropsButtonProgressType>,
    protected readonly classesName?: string
  ) {
    this.bind = getBind(toRefs(this.props)?.progress, {
      circular: true,
      inverse: true,
      delay: 128
    }, 'visible')
  }

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  render (): VNode[] {
    const elements: any[] = []

    if (
      this.components &&
      this.props?.progress
    ) {
      this.components.renderAdd(elements, 'progress', {
        class: this.classesName || 'progress',
        ...this.bind.value
      })
    }

    return elements
  }
}
