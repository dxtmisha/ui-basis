import { computed, /* :component.once ComputedRef, */ VNode } from 'vue'

import { /* :component.once Design, */ DesignPropsExtendedType, DesignPropsRefsType } from '../../../classes/Design'
import { DesignComponents } from '../../../classes/DesignComponents'

import {
  ConstructorComponentsInterface,
  ConstructorPropsValueType
} from './types'
import { DesignClasses } from '../../../classes/DesignClasses'

// :component.once import { PropsComponentType } from '../Component/props'

/**
 * Constructor// :component.once Component
 */
export class Constructor/* :component.once Component */<
  C extends ConstructorComponentsInterface = ConstructorComponentsInterface,
  M extends ConstructorPropsValueType = ConstructorPropsValueType,
  P extends DesignPropsExtendedType/* :component.once <PropsComponentType> */ = DesignPropsExtendedType/* :component.once <PropsComponentType> */
> {
  // :component.once readonly bind: ComputedRef<P>

  /**
   * Constructor
   * @param classes class name for the component / название класса для компонента
   * @param components object for working with components / объект для работы с компонентами
   * @param props input parameter / входной параметр
   * @param refs object for working with components / входной параметр в виде реактивной ссылки
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly classes: DesignClasses,
    protected readonly components: DesignComponents<C>,
    protected readonly props: M,
    protected readonly refs: DesignPropsRefsType<M>
  ) {
    // this.bind = Design.getBindStatic<any, P>(refs?.component, this.options, 'value')
    // :component.once this.bind = Design.getBindStatic<any, P>(refs?.component, {}, 'value')
  }

  /**
   * Checks if the element is active
   *
   * Проверяет, активен ли элемент
   */
  readonly is = computed<boolean>(
    () => !!(/* :component.once this.components.is('component') && */ this.props/* :component.once .component */)
  )

  /**
   * Basic parameters
   *
   * Базовые параметры
   */
  // readonly options = computed<P>(() => {
  //   return {} as P
  // })

  /**
   * A method for rendering
   *
   * Метод для рендеринга
   * @protected
   */
  render (): VNode[] {
    const elements: any[] = []
    const props = {
      // :component.once class: this.classes.getNameBySubclass(['component']),
      // :component.once ...this.bind.value
    }

    if (this.is.value) {
      // :component.once this.components.render(elements, 'component', props)
    }

    return elements
  }
}
