import { computed, /* :component.once ComputedRef, */ VNode } from 'vue'

import { /* :component.once Design, */ DesignPropsExtendedType, DesignPropsRefsType } from '../../../classes/Design'
import { DesignComponents } from '../../../classes/DesignComponents'

import {
  ConstructorComponentsInterface,
  ConstructorPropsValueType
} from './types'

// :component.once import { PropsComponentType } from '../Component/props'

/**
 * ButtonProgress
 */
export class ConstructorComponent<
  P extends DesignPropsExtendedType/* :component.once <PropsComponentType> */ = DesignPropsExtendedType/* :component.once <PropsComponentType> */,
  M extends ConstructorPropsValueType = ConstructorPropsValueType,
  C extends ConstructorComponentsInterface = ConstructorComponentsInterface
> {
  // :component.once readonly bind: ComputedRef<P>
  // :component.once readonly name: keyof C = 'component'

  /**
   * Constructor
   * @param className class name for the component / название класса для компонента
   * @param components object for working with components / объект для работы с компонентами
   * @param props input parameter / входной параметр
   * @param refs object for working with components / входной параметр в виде реактивной ссылки
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly className: string,
    protected readonly components: DesignComponents<C>,
    protected readonly props: M,
    protected readonly refs: DesignPropsRefsType<M>
  ) {
    // :component.once this.bind = Design.getBindStatic<any, P>(refs?.component, this.options, 'value')
  }

  /**
   * Checks if the element is active
   *
   * Проверяет, активен ли элемент
   */
  readonly is = computed<boolean>(
    () => !!(/* :component.once this.components.is(this.name) && */ this.props/* :component.once .component */)
  )

  /**
   * Basic parameters
   *
   * Базовые параметры
   */
  readonly options: P = {} as P
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

    if (this.is.value) {
      // :component.once this.components.render(elements, this.name, this.bind.value)
    }

    return elements
  }
}
