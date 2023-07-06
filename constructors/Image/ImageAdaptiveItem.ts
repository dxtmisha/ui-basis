import { computed, ref, Ref } from 'vue'
import { getIdElement } from '../../functions/element'

import { ImageCalculationList } from './ImageCalculationList'

import { ImageElementType, ImageItemType } from './types'

/**
 * Value in pixels, defining the limit beyond the screen, up to which the
 * image size is still calculated
 *
 * Значение в пикселях, определяющее предел за экраном, до которого все
 * еще вычисляется размер изображения
 */
export const MAX_BEYOND = 256

/**
 * Class for controlling the scaling behavior of a specific element
 *
 * Класс для управления поведением масштабирования конкретного элемента
 */
export class ImageAdaptiveItem {
  readonly percentWidth = ref<number>(0)
  readonly percentHeight = ref<number>(0)

  /**
   * Determines whether to calculate the size of the element
   *
   * Определяет, вычислять ли размер элемента
   * @protected
   */
  protected beyond = false as boolean

  /**
   * Determines whether the element is visible on the user’s screen
   *
   * Определяет, виден ли элемент на экране пользователя
   * @protected
   */
  protected visible = false as boolean

  /**
   * Constructor
   * @param element image element for scaling / элемент изображения для масштабирования
   * @param info image data / данные изображения
   * @param groupName group name / название группы
   * @param adaptive activity status / статус активности
   * @param width physical width of the object / физическая ширина объекта
   * @param height physical height of the object / физическая высота объекта
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly element: ImageElementType,
    protected readonly info: Ref<ImageItemType>,
    protected readonly groupName: Ref<string>,
    protected readonly adaptive: Ref<boolean>,
    protected readonly width: Ref<number>,
    protected readonly height: Ref<number>
  ) {
  }

  /**
   * Directions for alignment
   *
   * Направления для выравнивания
   */
  readonly type = computed<'x' | 'y' | undefined>(() => {
    if (
      this.width.value &&
      this.percentWidth.value > 0
    ) {
      return 'x'
    } else if (
      this.height.value &&
      this.percentHeight.value > 0
    ) {
      return 'y'
    } else {
      return undefined
    }
  })

  /**
   * Calculation of the actual size of the object in scale relative to the real size
   *
   * Вычисление фактического размера объекта в масштабе относительно реального размера
   */
  readonly size = computed<number>(() => {
    const element = this.element.value
    const data = this.info.value

    if (element && data) {
      switch (this.type.value) {
        case 'x':
          return data.height * (element.offsetWidth * this.percentWidth.value / data.width)
        case 'y':
          return data.width * (element.offsetHeight * this.percentHeight.value / data.height)
      }
    }

    return 0
  })

  /**
   * Multiplier, for determining the scaling of the image, corresponding to the element
   *
   * Множитель, для определения масштабирования изображения, соответствующий элементу
   */
  readonly factor = computed<number>(() => {
    const element = this.element.value
    const size = this.size.value

    if (element) {
      if (
        this.type.value === 'x' &&
        size > element.offsetHeight
      ) {
        return element.offsetHeight / size
      } else if (
        this.type.value === 'y' &&
        size > element.offsetWidth
      ) {
        return element.offsetWidth / size
      }
    }

    return 1
  })

  /**
   * Calculation of the value for the background-size property
   *
   * Вычисление значения для свойства background-size
   */
  readonly backgroundSize = computed<string | undefined>(() => {
    const factorMax = ImageCalculationList.get(this.groupName.value).getFactorMax()

    switch (this.type.value) {
      case 'x':
        return `${100 * this.percentWidth.value * factorMax}% auto`
      case 'y':
        return `auto ${100 * this.percentHeight.value * factorMax}%`
    }

    return undefined
  })

  /**
   * Checks if the current element is available for size adaptation
   *
   * Проверяет, доступен ли текущий элемент для адаптации размера
   */
  isAdaptive (): boolean {
    return !!(
      this.element.value &&
      this.element.value.closest('body') &&
      this.adaptive.value && (
        this.width.value ||
        this.height.value
      )
    )
  }

  /**
   * Checks for compliance with the group
   *
   * Проверяет на соответствие группе
   * @param name name of the checked group / название проверяемой группы
   */
  isGroup (name: string): boolean {
    return this.groupName.value === name
  }

  /**
   * Is it available for calculation
   *
   * Доступен ли для вычисления
   */
  isBeyond (): boolean {
    return this.beyond
  }

  /**
   * Is the element visible
   *
   * Виден ли элемент
   */
  isVisible (): boolean {
    return this.visible
  }

  /**
   * Returns the identifier of the element
   *
   * Возвращает идентификатор элемента
   */
  getId (): string {
    return getIdElement(this.element.value)
  }

  /**
   * Returns the current element
   *
   * Возвращает текущий элемент
   */
  getElement (): HTMLElement | undefined {
    return this.element.value
  }

  /**
   * Returns the name of the group
   *
   * Возвращает название группы
   */
  getGroup (): string {
    return this.groupName.value
  }

  /**
   * Returns the physical width of the object
   *
   * Возвращает физическую ширину объекта
   */
  getWidth (): number {
    return this.width.value || 0
  }

  /**
   * Returns the physical height of the object
   *
   * Возвращает физическую высоту объекта
   */
  getHeight (): number {
    return this.height.value || 0
  }

  /**
   * Size change for calculation
   *
   * Изменение размера для вычисления
   * @param width width value / значение ширины
   * @param height height value / значение высоты
   */
  setPercent (width: number, height: number): this {
    this.percentWidth.value = width
    this.percentHeight.value = height

    return this
  }

  /**
   * Updating data on tracking status
   *
   * Обновление данных по статусу отслеживания
   */
  update (): this {
    this.beyond = false
    this.visible = false

    if (this.isAdaptive()) {
      const rect = this.element.value?.getBoundingClientRect()

      if (rect) {
        this.beyond = !(
          rect.bottom < (0 - MAX_BEYOND) ||
          rect.top > (window.innerHeight + MAX_BEYOND)
        )

        this.visible = !(
          rect.bottom < 0 ||
          rect.top > window.innerHeight
        )
      }
    }

    return this
  }
}
